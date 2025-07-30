import { Headers, OpenAPIConfig } from '@/api/interfaces';
import { provideApiConfig } from '@/services/api-config';

export const OpenAPI: OpenAPIConfig = {
    BASE: async () => {
        const baseUrl = await provideApiConfig('NEXT_PUBLIC_API_URL');
        return baseUrl || 'http://control.dev.rage.sibedge.com';
    },
    VERSION: 'current',
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'include',
    TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: async () => {
        const headers: Headers = {};
        const token = await provideApiConfig('NEXT_PUBLIC_API_TOKEN');
        headers.Authorization = `Bearer ${token}`;
        return headers;
    },
    ENCODE_PATH: undefined,
};
