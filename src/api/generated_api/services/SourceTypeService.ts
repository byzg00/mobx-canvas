/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedResponse_litestar_dto__backend_AllSourceTypeResponseBody_ } from '../models/SourceTypeService/PaginatedResponse_litestar_dto__backend_AllSourceTypeResponseBody_';
import type { RetrieveSourceTypeResponseBody } from '../models/SourceTypeService/RetrieveSourceTypeResponseBody';
import type { SourceSchema } from '../models/SourceTypeService/SourceSchema';
import type { CancelablePromise } from '../../core/CancelablePromise';
import { OpenAPI } from '../OpenAPI';
import { request as __request } from '../../core/request';
export class SourceTypeService {
    /**
     * List items
     * List items with optional filtering and pagination
     * @returns PaginatedResponse_litestar_dto__backend_AllSourceTypeResponseBody_ Request fulfilled, document follows
     * @throws ApiError
     */
    public static getSourceTypesAll({
        limit,
        offset,
    }: {
        limit?: number | null;
        offset?: number | null;
    }): CancelablePromise<PaginatedResponse_litestar_dto__backend_AllSourceTypeResponseBody_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/source_types/all',
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
     * Get item by ID
     * Retrieve a single item by its UUID
     * @returns RetrieveSourceTypeResponseBody Request fulfilled, document follows
     * @throws ApiError
     */
    public static getSourceType({ id }: { id: string }): CancelablePromise<RetrieveSourceTypeResponseBody> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/source_types/{id}',
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
    public static deleteSourceType({
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
            url: '/source_types/{id}',
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
     * Get Source Validation Schema
     * Returns JSON validation schemas for the specified source type. These schemas define the expected format for source settings, included IDs, and excluded IDs.
     * @returns SourceSchema Request fulfilled, document follows
     * @throws ApiError
     */
    public static getSourceTypeSchema({ id }: { id: string }): CancelablePromise<SourceSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/source_types/{id}/schema',
            path: {
                id: id,
            },
            errors: {
                400: `Bad request syntax or unsupported method`,
            },
        });
    }
}
