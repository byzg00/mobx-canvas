import { RetrieveAssistantResponseBody } from '@/api/generated_api';

export type ValueOf<T> = T[keyof T];

export type ApiConfig = {
    NEXT_PUBLIC_API_URL: string | undefined;
    NEXT_PUBLIC_API_TOKEN: string | undefined;
};

export type Assistant = RetrieveAssistantResponseBody;
