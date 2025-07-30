import axios, { AxiosResponse } from 'axios';

import type { ApiConfig } from '@/types';

let apiConfigPromise: Promise<AxiosResponse<ApiConfig>>;

const loadConfig = () => {
    apiConfigPromise = axios.get('/api/config');
};
if (typeof window !== 'undefined') {
    loadConfig();
}

export const provideApiConfig = async (configName: keyof ApiConfig) => {
    if (typeof window === 'undefined') {
        return process.env[configName];
    }
    const response = await apiConfigPromise;
    return response.data[configName];
};
