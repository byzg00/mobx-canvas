import { generate } from 'openapi-typescript-codegen';
import ts from 'typescript';
import commonjsVariables from 'commonjs-variables-for-esmodules';
import pluralize from 'pluralize';

import { getDependencyGraph, getRequestParameters } from './utils/typescriptUtils';
import { methodsMap } from './constants';
import { DependencyMap, DependencyNode } from './utils/types';
import { getMergedSchemas } from './utils/schemaLoader';
import { Config } from './interfaces';

import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

const { isPlural, singular } = pluralize;
const { __dirname } = commonjsVariables(import.meta);

export function applyFileRenames(program: ts.Program, map: DependencyMap): void {
    program.getSourceFiles().forEach((sourceFile) => {
        const node = map.get(sourceFile.fileName);
        if (node) {
            const dir = path.dirname(node.name);
            let { text } = sourceFile;
            node.children.forEach((child, oldImportPath) => {
                const childNode = map.get(child);
                if (childNode) {
                    const relativePath = path.relative(dir, childNode.name);
                    if (node.name !== node.originalName || childNode.name !== childNode.originalName) {
                        const newImportPath = (
                            relativePath.startsWith('.') ? relativePath : `./${relativePath}`
                        ).replace(/\.ts$/, '');
                        text = text.replace(oldImportPath, newImportPath);
                    }
                }
            });
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(node.name, text);
            if (node.name !== sourceFile.fileName) {
                fs.unlinkSync(sourceFile.fileName);
            }
        }
    });
}

export function copyFiles(map: DependencyMap, root: DependencyNode, oldPath: string, newPath: string) {
    const copiedFiles: string[] = [];

    function traverse(node: DependencyNode) {
        const relativePath = path.relative(oldPath, node.name);
        const newAbsolutePath = path.resolve(newPath, relativePath);
        const dir = path.dirname(newAbsolutePath);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.copyFileSync(node.name, newAbsolutePath);
        node.copied = true;
        copiedFiles.push(relativePath);

        node.children.forEach((child) => {
            const childNode = map.get(child);
            if (childNode && !childNode.copied) {
                traverse(childNode);
            }
        });
    }

    traverse(root);
    return copiedFiles;
}

export function copyServices(map: DependencyMap, baseDir: string, outDir: string, services: string[]) {
    const copiedFilesSet = new Set<string>();
    const servicesPath = path.resolve(path.join(baseDir, 'services'));

    services.forEach((serviceName) => {
        const servicePath = path.join(servicesPath, `${serviceName}.ts`);
        const serviceNode = map.get(servicePath);
        if (serviceNode) {
            const copiedFiles = copyFiles(map, serviceNode, baseDir, path.join(__dirname, outDir));
            copiedFiles.forEach((filePath) => copiedFilesSet.add(filePath));
        }
    });

    return Array.from(copiedFilesSet).map((filePath) => `./${filePath.slice(0, filePath.length - 3)}`);
}

export function copyIndex(baseDir: string, outDir: string, copiedFilesArray: string[]) {
    const indexPath = path.resolve(path.join(baseDir, 'index.ts'));
    const indexFileText = fs.readFileSync(indexPath, 'utf-8');
    const updatedIndex = indexFileText
        .split('\n')
        .filter(
            (line) =>
                !line || line.startsWith('/*') || copiedFilesArray.some((filePath) => line.includes(`'${filePath}'`)),
        )
        .join('\n');
    fs.writeFileSync(path.join(__dirname, outDir, 'index.ts'), updatedIndex);

    const openApiPath = path.resolve(path.join(baseDir, 'OpenAPI.ts'));
    fs.writeFileSync(path.join(__dirname, outDir, 'OpenAPI.ts'), fs.readFileSync(openApiPath, 'utf-8'));
}

function generateClient(baseDir: string, input: string | Record<string, unknown>) {
    return generate({
        input,
        output: baseDir,
        httpClient: 'axios',
        useOptions: true,
        exportCore: false,
        useUnionTypes: true,
    });
}

const capitalize = (str: string): string => (str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str);

function toPascalCase(str: string): string {
    return str.split(/[ -_]/).map(capitalize).join('');
}

function getName(config: Config, className: string, url: string, httpMethod: keyof typeof methodsMap): string {
    const override = config.overrides.find(
        ({
             method: overrideMethod,
             url: overrideUrl,
         }) => overrideMethod === httpMethod && overrideUrl === url,
    );
    if (override) {
        return override.name;
    }

    let urlWithoutPrefix = url;
    config.prefixes.forEach((prefix) => {
        urlWithoutPrefix = urlWithoutPrefix.replace(prefix, '');
    });
    const urlParts = urlWithoutPrefix
        .split('/')
        .filter((part) => part)
        .map((part) => part.toLowerCase());

    for (let i = 0; i < urlParts.length; i++) {
        if (
            !config.keepPlural.includes(urlParts[i]) &&
            isPlural(urlParts[i]) &&
            urlParts.slice(i + 1).some((s) => s.startsWith('{'))
        ) {
            urlParts[i] = singular(urlParts[i]);
        }
    }

    return (
        methodsMap[httpMethod] +
        urlParts
            .filter((part) => !part.includes('{'))
            .map(toPascalCase)
            .join('')
    );
}

function refactorModels(baseDir: string, outDir: string, services: string[]) {
    const indexPath = path.resolve(path.join(baseDir, 'index.ts'));
    const modelsPath = path.resolve(path.join(baseDir, 'models'));

    const program = ts.createProgram([indexPath], {}, ts.createCompilerHost({}, true));

    const map = getDependencyGraph(program, indexPath);

    map.forEach((node) => {
        if (node.name.startsWith(modelsPath)) {
            if (node.roots.size > 1) {
                node.name = path.resolve(path.join(modelsPath, 'shared', path.basename(node.name)));
            }
            if (node.roots.size === 1) {
                const service = path.basename(Array.from(node.roots.values())[0], '.ts');
                node.name = path.resolve(path.join(modelsPath, service, path.basename(node.name)));
            }
        }
    });

    applyFileRenames(program, map);

    const copiedFilesArray = copyServices(map, baseDir, outDir, services);
    copyIndex(baseDir, outDir, copiedFilesArray);
}

function renameServiceMethods(config: Config, baseDir: string) {
    const servicesPath = path.join(baseDir, 'services');
    const servicePaths = config.services.map((fileName) => path.resolve(path.join(servicesPath, `${fileName}.ts`)));
    servicePaths.forEach((serviceFilePath) => {
        let fileText = fs.readFileSync(serviceFilePath, 'utf-8');
        const sourceFile = ts.createSourceFile(serviceFilePath, fileText, ts.ScriptTarget.Latest, true);
        const classDeclaration = sourceFile.statements.find(ts.isClassDeclaration);
        const className = classDeclaration?.name?.escapedText;

        if (className && !config.excludeServicesFromMethodRenaming?.includes(className)) {
            classDeclaration?.members?.filter(ts.isMethodDeclaration).forEach((member) => {
                const { methodName, httpMethod, url } = getRequestParameters(member);
                const newMethodName = getName(config, className, url, httpMethod);
                fileText = fileText.replace(`public static ${methodName}(`, `public static ${newMethodName}(`);
            });
            fs.writeFileSync(serviceFilePath, fileText);
        }
    });
}

function fixServiceImports(config: Config, baseDir: string) {
    const servicesPath = path.join(baseDir, 'services');
    const servicePaths = config.services.map((fileName) => path.resolve(path.join(servicesPath, `${fileName}.ts`)));

    const openApiText = fs.readFileSync(path.resolve(__dirname, config.openApiFile), 'utf-8');
    fs.writeFileSync(path.join(baseDir, 'OpenAPI.ts'), openApiText);

    servicePaths.forEach((serviceFilePath) => {
        const fileText = fs.readFileSync(serviceFilePath, 'utf-8')
            .replace(/'\.\.\/core\//g, "'../../core/")
            .replace(/'\.\.\/\.\.\/core\/OpenAPI'/, "'../OpenAPI'");
        fs.writeFileSync(serviceFilePath, fileText);
    });
}

async function main() {
    const { config } = await import(path.resolve(__dirname, process.argv[2]));
    const baseDir = path.join(__dirname, 'tmp');
    fs.rmSync(baseDir, { recursive: true, force: true });
    fs.rmSync(path.join(__dirname, config.outDir, 'models'), { recursive: true, force: true });
    fs.rmSync(path.join(__dirname, config.outDir, 'services'), { recursive: true, force: true });

    const schema = await getMergedSchemas(process.argv[2], process.argv[3]);
    if (schema) {
        await generateClient(baseDir, schema);
    }
    renameServiceMethods(config, baseDir);
    fixServiceImports(config, baseDir);
    refactorModels(baseDir, config.outDir, config.services);
    fs.rmSync(baseDir, { recursive: true, force: true });
    execSync(`npx prettier --write ${path.join(__dirname, config.outDir)}`);
}

main();
