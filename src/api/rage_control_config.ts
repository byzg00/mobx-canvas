import { Config } from './interfaces';

export const config: Config = {
    // schemaFile: './rage_control_schema.json',
    requestOptions: [
        {
            requestProtocol: 'http',
            host: 'control.dev.rage.sibedge.com',
            // http://control.dev.rage.sibedge.com/docs/swagger
            path: '/docs/openapi.json',
            method: 'GET',
        },
    ],
    openApiFile: './rage_control_open_api.ts',
    removePublicPrefix: true,
    outDir: './generated_api',
    services: [
        'AssistantService',
        'PromptService',
        'CollectionService',
        'SourceService',
        'SourceTypeService',
    ],
    prefixes: [],
    keepPlural: [],
    overrides: [],
};
