import * as ts from 'typescript';

import { methodsMap } from '../constants';

import { DependencyMap, DependencyNode } from './types';

import path from 'path';

function getMethodArguments(methodDeclaration: ts.MethodDeclaration): string[] {
    if (methodDeclaration.parameters.length === 0) {
        return [];
    }
    const methodArguments = methodDeclaration.parameters[0].name as ts.ObjectBindingPattern;
    return methodArguments.elements
        .filter(ts.isBindingElement)
        .map(({ name }) => name)
        .filter(ts.isIdentifier)
        .map((identifier) => identifier.getText());
}

export function getRequestParameters(methodDeclaration: ts.MethodDeclaration): {
    methodName: string;
    hasParameters: boolean;
    httpMethod: keyof typeof methodsMap;
    url: string;
    argumentNames: string[];
} {
    const methodName = ts.isIdentifier(methodDeclaration.name) ? methodDeclaration.name.text : '';
    const hasParameters = methodDeclaration.parameters.length > 0;
    const returnStatement = methodDeclaration.body?.statements[0] as ts.ReturnStatement;
    const requestCall = returnStatement.expression as ts.CallExpression;
    const requestOptions = requestCall.arguments[1] as ts.ObjectLiteralExpression;
    const httpMethodProperty = requestOptions.properties[0] as ts.PropertyAssignment;
    const httpMethod = (httpMethodProperty.initializer as ts.StringLiteral).text as keyof typeof methodsMap;
    const urlMethodProperty = requestOptions.properties[1] as ts.PropertyAssignment;
    const url = (urlMethodProperty.initializer as ts.StringLiteral).text;
    const argumentNames = getMethodArguments(methodDeclaration);
    return {
        methodName,
        hasParameters,
        httpMethod,
        url,
        argumentNames,
    };
}

export function getImportedModules(
    sourceFile: ts.SourceFile,
): { modulePath: string; importedModuleAbsolutePath: string }[] {
    return sourceFile.statements
        .filter((statement) => ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement))
        .filter((declaration) => {
            const { moduleSpecifier } = declaration as ts.ExportDeclaration | ts.ImportDeclaration;
            return moduleSpecifier && ts.isStringLiteral(moduleSpecifier);
        })
        .map(
            (declaration) =>
                `${
                    ((declaration as ts.ExportDeclaration | ts.ImportDeclaration).moduleSpecifier as ts.StringLiteral)
                        .text
                }`,
        )
        .filter((modulePath) => modulePath.startsWith('.'))
        .map((modulePath) => {
            const importedModuleAbsolutePath = path.resolve(
                path.join(path.dirname(sourceFile.fileName), `${modulePath}.ts`),
            );
            return { modulePath, importedModuleAbsolutePath };
        });
}

export function getDependencyGraph(program: ts.Program, indexFileName: string): DependencyMap {
    const map: DependencyMap = new Map();

    program.getSourceFiles().forEach((sourceFile: ts.SourceFile) => {
        map.set(sourceFile.fileName, {
            name: sourceFile.fileName,
            originalName: sourceFile.fileName,
            roots: new Set(),
            children: new Map(),
            parents: new Set(),
        });
    });

    map.forEach((node) => {
        const sourceFile = program.getSourceFile(node.name);
        if (sourceFile) {
            const importedModules = getImportedModules(sourceFile);
            importedModules.forEach(({ modulePath, importedModuleAbsolutePath }) => {
                node.children.set(modulePath, importedModuleAbsolutePath);
                const childNode = map.get(importedModuleAbsolutePath);
                childNode?.parents.add(node.name);
            });
        }
    });

    function traverse(node: DependencyNode, roots?: Set<string>) {
        const rootsCount = node.roots.size;
        if (roots) {
            roots.forEach((root) => node.roots.add(root));
        }
        if (node.roots.size > rootsCount) {
            node.children.forEach((childName) => {
                const child = map.get(childName);
                if (child) {
                    traverse(child, node.roots);
                }
            });
        }
    }

    map.forEach((node) => {
        const isService = node.name.startsWith(path.join(path.dirname(indexFileName), 'services'));
        if (isService) {
            traverse(node, new Set([node.name]));
        }
    });

    return map;
}
