/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePromptRequestBody } from '../models/PromptService/CreatePromptRequestBody';
import type { CreatePromptResponseBody } from '../models/PromptService/CreatePromptResponseBody';
import type { PaginatedResponse_litestar_dto__backend_AllPromptResponseBody_ } from '../models/PromptService/PaginatedResponse_litestar_dto__backend_AllPromptResponseBody_';
import type { RetrievePromptResponseBody } from '../models/PromptService/RetrievePromptResponseBody';
import type { UpdatePromptRequestBody } from '../models/PromptService/UpdatePromptRequestBody';
import type { UpdatePromptResponseBody } from '../models/PromptService/UpdatePromptResponseBody';
import type { CancelablePromise } from '../../core/CancelablePromise';
import { OpenAPI } from '../OpenAPI';
import { request as __request } from '../../core/request';
export class PromptService {
    /**
     * List items
     * List items with optional filtering and pagination
     * @returns PaginatedResponse_litestar_dto__backend_AllPromptResponseBody_ Request fulfilled, document follows
     * @throws ApiError
     */
    public static getPromptsAll({
        limit,
        offset,
    }: {
        limit?: number | null;
        offset?: number | null;
    }): CancelablePromise<PaginatedResponse_litestar_dto__backend_AllPromptResponseBody_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/prompts/all',
            query: {
                limit: limit,
                offset: offset,
            },
            errors: {
                400: `Bad request syntax or unsupported method`,
            },
        });
    }
    /**
     * Create item
     * Create a new item
     * @returns CreatePromptResponseBody Document created, URL follows
     * @throws ApiError
     */
    public static createPrompts({
        requestBody,
        comment,
    }: {
        requestBody: CreatePromptRequestBody;
        /**
         * Optional comment for history
         */
        comment?: string | null;
    }): CancelablePromise<CreatePromptResponseBody> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/prompts',
            query: {
                comment: comment,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request syntax or unsupported method`,
            },
        });
    }
    /**
     * Get item by ID
     * Retrieve a single item by its UUID
     * @returns RetrievePromptResponseBody Request fulfilled, document follows
     * @throws ApiError
     */
    public static getPrompt({ id }: { id: string }): CancelablePromise<RetrievePromptResponseBody> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/prompts/{id}',
            path: {
                id: id,
            },
            errors: {
                400: `Bad request syntax or unsupported method`,
            },
        });
    }
    /**
     * Delete item
     * Delete an item by ID
     * @returns void
     * @throws ApiError
     */
    public static deletePrompt({
        id,
        comment,
    }: {
        id: string;
        /**
         * Optional comment for history
         */
        comment?: string | null;
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/prompts/{id}',
            path: {
                id: id,
            },
            query: {
                comment: comment,
            },
            errors: {
                400: `Bad request syntax or unsupported method`,
            },
        });
    }
    /**
     * Update item
     * Update an existing item
     * @returns UpdatePromptResponseBody Request fulfilled, document follows
     * @throws ApiError
     */
    public static patchPrompt({
        id,
        requestBody,
        comment,
    }: {
        id: string;
        requestBody: UpdatePromptRequestBody;
        /**
         * Optional comment for history
         */
        comment?: string | null;
    }): CancelablePromise<UpdatePromptResponseBody> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/prompts/{id}',
            path: {
                id: id,
            },
            query: {
                comment: comment,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request syntax or unsupported method`,
            },
        });
    }
}
