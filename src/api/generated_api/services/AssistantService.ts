/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAssistantRequestBody } from '../models/AssistantService/CreateAssistantRequestBody';
import type { CreateAssistantResponseBody } from '../models/AssistantService/CreateAssistantResponseBody';
import type { PaginatedResponse_litestar_dto__backend_AllAssistantResponseBody_ } from '../models/AssistantService/PaginatedResponse_litestar_dto__backend_AllAssistantResponseBody_';
import type { RetrieveAssistantResponseBody } from '../models/AssistantService/RetrieveAssistantResponseBody';
import type { UpdateAssistantRequestBody } from '../models/AssistantService/UpdateAssistantRequestBody';
import type { UpdateAssistantResponseBody } from '../models/AssistantService/UpdateAssistantResponseBody';
import type { CancelablePromise } from '../../core/CancelablePromise';
import { OpenAPI } from '../OpenAPI';
import { request as __request } from '../../core/request';
export class AssistantService {
    /**
     * List items
     * List items with optional filtering and pagination
     * @returns PaginatedResponse_litestar_dto__backend_AllAssistantResponseBody_ Request fulfilled, document follows
     * @throws ApiError
     */
    public static getAssistantsAll({
        limit,
        offset,
    }: {
        limit?: number | null;
        offset?: number | null;
    }): CancelablePromise<PaginatedResponse_litestar_dto__backend_AllAssistantResponseBody_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assistants/all',
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
     * @returns CreateAssistantResponseBody Document created, URL follows
     * @throws ApiError
     */
    public static createAssistants({
        requestBody,
        comment,
    }: {
        requestBody: CreateAssistantRequestBody;
        /**
         * Optional comment for history
         */
        comment?: string | null;
    }): CancelablePromise<CreateAssistantResponseBody> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/assistants',
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
     * @returns RetrieveAssistantResponseBody Request fulfilled, document follows
     * @throws ApiError
     */
    public static getAssistant({ id }: { id: string }): CancelablePromise<RetrieveAssistantResponseBody> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/assistants/{id}',
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
    public static deleteAssistant({
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
            url: '/assistants/{id}',
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
     * @returns UpdateAssistantResponseBody Request fulfilled, document follows
     * @throws ApiError
     */
    public static patchAssistant({
        id,
        requestBody,
        comment,
    }: {
        id: string;
        requestBody: UpdateAssistantRequestBody;
        /**
         * Optional comment for history
         */
        comment?: string | null;
    }): CancelablePromise<UpdateAssistantResponseBody> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/assistants/{id}',
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
    /**
     * Ingest data for assistant by assistant id
     * @returns string Document created, URL follows
     * @throws ApiError
     */
    public static createAssistantIngest({ id, dropOld }: { id: string; dropOld: boolean }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/assistants/{id}/ingest',
            path: {
                id: id,
            },
            query: {
                dropOld: dropOld,
            },
            errors: {
                400: `Bad request syntax or unsupported method`,
            },
        });
    }
}
