/* eslint-disable @typescript-eslint/no-explicit-any */
import { produce } from 'immer';
import commonjsVariables from 'commonjs-variables-for-esmodules';
import { camelCase } from 'lodash-es';

import { fixVoidTypeInSchema } from '@/api/fixVoidTypeInSchema';

import { fixDotNetGenericsInSchema } from '../fixDotNetGenericsInSchema';

import { OpenAPIObject } from './types';

import fs from 'fs';
import path from 'path';
import { request as httpsRequest, RequestOptions } from 'https';
import { request as httpRequest } from 'http';

const {
    __dirname,
} = commonjsVariables(import.meta);

function getHost(): { host: string; rejectUnauthorized: boolean } {
    throw new Error('getHost not implemented');
}

function schemaRequestOptions() {
    const { host, rejectUnauthorized } = getHost();
    return {
        host,
        port: 443,
        path: '/api/doc.json',
        method: 'GET',
        rejectUnauthorized,
        headers: { Authorization: `Basic ${Buffer.from('money:money').toString('base64')}` },
    };
}

function getSchema(
    requestOptions: RequestOptions | string | URL,
    requestMethod = httpsRequest,
): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
        let body = '';
        const req = requestMethod(requestOptions, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('error', (error) => {
                reject(error);
            });
            res.on('end', () => {
                body = fixVoidTypeInSchema(body);
                resolve(JSON.parse(body) as Record<string, any>);
            });
        });
        req.end();
    });
}

function loadSchema(schemaFile: string, removePublicPrefix: boolean) {
    let schema = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../', schemaFile), 'utf-8'));
    fixDotNetGenericsInSchema(schema, removePublicPrefix);
    schema = fixVoidTypeInSchema(schema);
    // return schema;
    // const camelized = camelizeSchema(schema);
    // fs.writeFileSync('./swagger.camel.json', JSON.stringify(camelized, null, 2));
    return camelizeSchema(schema);
}

function mergeSchemas(schemas: Array<Record<string, any>>) {
    return schemas.reduce((acc: Record<string, any>, schema: Record<string, any>, i) => {
        if (i === 0) return schema;
        return produce(acc, (draft) => {
            Object.assign(draft.paths, schema.paths);
            Object.assign(draft.components.schemas, schema.components.schemas);
        });
    }, {});
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function camelizeSchemaFields<T = unknown>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(camelizeSchemaFields) as T;
    }

    if (isPlainObject(obj)) {
        const result: Record<string, unknown> = {};

        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(obj)) {
            // Не трогаем специальные поля
            if (key === '$ref' || key === 'enum' || key === 'example' || key === 'title' || key === 'description' || key === 'format') {
                result[key] = value;
                // eslint-disable-next-line no-continue
                continue;
            }

            // Кемелизируем ключ
            const newKey = camelCase(key);

            // Специальная обработка required
            if (newKey === 'required' && Array.isArray(value)) {
                result[newKey] = value.map((v) => typeof v === 'string' ? camelCase(v) : v);
                // eslint-disable-next-line no-continue
                continue;
            }

            // discriminator.propertyName
            if (newKey === 'discriminator' && isPlainObject(value)) {
                const copy = { ...value };
                if (typeof copy.propertyName === 'string') {
                    copy.propertyName = camelCase(copy.propertyName);
                }
                result[newKey] = camelizeSchemaFields(copy);
                // eslint-disable-next-line no-continue
                continue;
            }

            // xml.name
            if (newKey === 'xml' && isPlainObject(value) && typeof value.name === 'string') {
                result[newKey] = {
                    ...value,
                    name: camelCase(value.name),
                };
                // eslint-disable-next-line no-continue
                continue;
            }

            result[newKey] = camelizeSchemaFields(value);
        }

        return result as T;
    }

    return obj;
}

// eslint-disable-next-line camelcase
export function camelizeSchema(schema: OpenAPIObject): OpenAPIObject {
    const newSchema = structuredClone(schema);

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const _path in newSchema.paths ?? {}) {
        const methods = newSchema.paths?.[_path] ?? {};
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const method in methods) {
            const endpoint = methods[method];

            // parameters
            if (Array.isArray(endpoint.parameters)) {
                endpoint.parameters = endpoint.parameters.map((param: any) => ({
                    ...param,
                    name: camelCase(param.name),
                }));
            }

            // requestBody
            const bodySchema = endpoint.requestBody?.content?.['application/json']?.schema;
            if (bodySchema && endpoint.requestBody?.content?.['application/json']) {
                endpoint.requestBody.content['application/json'].schema =
                    camelizeSchemaFields(bodySchema);
            }

            // responses
            if (endpoint.responses) {
                // eslint-disable-next-line guard-for-in,no-restricted-syntax
                for (const code in endpoint.responses) {
                    const res = endpoint.responses[code];
                    const responseSchema = res?.content?.['application/json']?.schema;
                    if (responseSchema && res.content?.['application/json']) {
                        res.content['application/json'].schema =
                            camelizeSchemaFields(responseSchema);
                    }
                }
            }
        }
    }

    // components.schemas
    if (newSchema.components?.schemas) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [schemaName, schemaDef] of Object.entries(newSchema.components.schemas)) {
            newSchema.components.schemas[schemaName] = camelizeSchemaFields(schemaDef);
        }
    }

    return newSchema;
}

export async function getMergedSchemas(configName: string, dld?: string) {
    const { config } = await import(path.resolve(__dirname, '..', configName));
    if (config.schemaFile) {
        return loadSchema(config.schemaFile, config.removePublicPrefix ?? false);
    }
    if (config.requestOptions) {
        const getAndFixSchema = async (
            requestOptions: RequestOptions & {
                requestProtocol: 'http' | 'https';
            },
        ) => {
            const schema = await getSchema(
                requestOptions,
                requestOptions.requestProtocol === 'http' ? httpRequest : httpsRequest,
            );
            fixDotNetGenericsInSchema(schema, config.removePublicPrefix ?? false);
            return camelizeSchema(schema);
        };
        return Array.isArray(config.requestOptions)
            ? mergeSchemas(
                await Promise.all(
                    config.requestOptions.map(
                        (requestOptions: RequestOptions & { requestProtocol: 'http' | 'https' }) =>
                            getAndFixSchema(requestOptions),
                    ),
                ),
            )
            : getAndFixSchema(config.requestOptions);
    }
    if (!dld) {
        return undefined;
    }
    const schema = await getSchema(schemaRequestOptions());
    fixDotNetGenericsInSchema(schema, config.removePublicPrefix ?? false);
    return schema;
}
