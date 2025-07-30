import type { AxiosError } from 'axios';
import chalk from 'chalk';

const logOnServer = (...args: Parameters<typeof console.log>): void => {
    if (global) {
        console.log(...args);
    }
};

type RequestLogger = {
    request: () => void;
    response: (data: unknown) => void;
    error: (error: unknown) => void;
};

const MAX_LENGTH = 2000;
export const createRequestLogger = (url: string): RequestLogger => {
    const formatJson = (data: unknown): string => {
        try {
            return JSON.stringify(data).substring(0, MAX_LENGTH);
        } catch {
            return '[unserializable]';
        }
    };

    const requestLine = `${chalk.cyanBright('API request')} ${chalk.gray(url)}`;

    return {
        request() {
            // ничего не логируем здесь — по требованию
        },
        response(data) {
            const responseLine = `${chalk.greenBright('API response')} ${chalk.gray(formatJson(data))}`;
            logOnServer(`${requestLine}\n${responseLine}\n`);
        },
        error(error) {
            const axiosError = error as Partial<AxiosError>;
            const errorLine = axiosError?.response
                ? `${chalk.redBright(`API error ${axiosError.response.status}`)}: ${chalk.gray(formatJson(axiosError.response.data))}`
                : `${chalk.redBright('API error')}: ${chalk.gray((axiosError?.message ?? 'Unknown error'))}`;

            logOnServer(`${requestLine}\n${errorLine}\n`);
        },
    };
};
