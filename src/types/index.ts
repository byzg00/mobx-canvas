import {
    RetrieveAssistantResponseBody,
    RetrieveCollectionResponseBody,
    RetrievePromptResponseBody
} from '@/api/generated_api';

export type ValueOf<T> = T[keyof T];

type SnakeCase<S extends string> =
    S extends `${infer T}${infer U}` ?
        `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}` :
        S

export type SnakeCaseObject<T> = {
    [K in keyof T as SnakeCase<K & string>]: T[K];
};

export type ApiConfig = {
    NEXT_PUBLIC_API_URL: string | undefined;
    NEXT_PUBLIC_API_TOKEN: string | undefined;
};

export type Assistant = RetrieveAssistantResponseBody;
export type Prompt = RetrievePromptResponseBody;
export type Collection = RetrieveCollectionResponseBody;
