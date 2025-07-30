import type { ApiRequestOptions } from '@/api/core/ApiRequestOptions';

export interface Config {
    requestOptions?: {
        requestProtocol: string;
        host: string;
        path: string;
        port?: number;
        method: string;
    }[];
    requestProtocol?: string;
    schemaFile?: string;
    openApiFile: string;
    outDir: string;
    services: string[];
    prefixes: string[];
    keepPlural: string[];
    removePublicPrefix?: boolean;
    overrides: {
        method: string;
        url: string;
        name: string;
    }[];
    excludeServicesFromMethodRenaming?: string[];
}

export type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
export type Headers = Record<string, string>;

export type OpenAPIConfig = {
    BASE: Resolver<string>;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
    ENCODE_PATH?: (path: string) => string;
};
