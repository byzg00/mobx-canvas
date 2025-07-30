/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSourceRequestBody } from '../models/SourceService/CreateSourceRequestBody';
import type { CreateSourceResponseBody } from '../models/SourceService/CreateSourceResponseBody';
import type { PaginatedResponse_litestar_dto__backend_AllSourceResponseBody_ } from '../models/SourceService/PaginatedResponse_litestar_dto__backend_AllSourceResponseBody_';
import type { RetrieveSourceResponseBody } from '../models/SourceService/RetrieveSourceResponseBody';
import type { UpdateSourceRequestBody } from '../models/SourceService/UpdateSourceRequestBody';
import type { UpdateSourceResponseBody } from '../models/SourceService/UpdateSourceResponseBody';
import type { CancelablePromise } from '../../core/CancelablePromise';
import { OpenAPI } from '../OpenAPI';
import { request as __request } from '../../core/request';
export class SourceService {
    /**
     * List items
     * List items with optional filtering and pagination
     * @returns PaginatedResponse_litestar_dto__backend_AllSourceResponseBody_ Request fulfilled, document follows
     * @throws ApiError
     */
    public static getSourcesAll({
        limit,
        offset,
        collectionId,
    }: {
        limit?: number | null;
        offset?: number | null;
        collectionId?: string | null;
    }): CancelablePromise<PaginatedResponse_litestar_dto__backend_AllSourceResponseBody_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sources/all',
            query: {
                limit: limit,
                offset: offset,
                collectionId: collectionId,
            },
            errors: {
                400: `Bad request syntax or unsupported method`,
            },
        });
    }
    /**
     * Create item
     * Create a new item
     * @returns CreateSourceResponseBody Document created, URL follows
     * @throws ApiError
     */
    public static createSources({
        requestBody,
        comment,
    }: {
        requestBody: CreateSourceRequestBody;
        /**
         * Optional comment for history
         */
        comment?: string | null;
    }): CancelablePromise<CreateSourceResponseBody> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sources',
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
     * @returns RetrieveSourceResponseBody Request fulfilled, document follows
     * @throws ApiError
     */
    public static getSource({ id }: { id: string }): CancelablePromise<RetrieveSourceResponseBody> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/sources/{id}',
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
    public static deleteSource({
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
            url: '/sources/{id}',
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
     * @returns UpdateSourceResponseBody Request fulfilled, document follows
     * @throws ApiError
     */
    public static patchSource({
        id,
        requestBody,
        comment,
    }: {
        id: string;
        requestBody: UpdateSourceRequestBody;
        /**
         * Optional comment for history
         */
        comment?: string | null;
    }): CancelablePromise<UpdateSourceResponseBody> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/sources/{id}',
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
