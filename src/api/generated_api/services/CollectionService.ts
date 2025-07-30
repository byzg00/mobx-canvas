/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCollectionCreateRequestRequestBody } from '../models/CollectionService/CreateCollectionCreateRequestRequestBody';
import type { CreateCollectionResponseBody } from '../models/CollectionService/CreateCollectionResponseBody';
import type { PaginatedResponse_litestar_dto__backend_AllCollectionResponseBody_ } from '../models/CollectionService/PaginatedResponse_litestar_dto__backend_AllCollectionResponseBody_';
import type { RetrieveCollectionResponseBody } from '../models/CollectionService/RetrieveCollectionResponseBody';
import type { UpdateCollectionResponseBody } from '../models/CollectionService/UpdateCollectionResponseBody';
import type { UpdateCollectionUpdateRequestRequestBody } from '../models/CollectionService/UpdateCollectionUpdateRequestRequestBody';
import type { CancelablePromise } from '../../core/CancelablePromise';
import { OpenAPI } from '../OpenAPI';
import { request as __request } from '../../core/request';
export class CollectionService {
    /**
     * List items
     * List items with optional filtering and pagination
     * @returns PaginatedResponse_litestar_dto__backend_AllCollectionResponseBody_ Request fulfilled, document follows
     * @throws ApiError
     */
    public static getCollectionsAll({
        limit,
        offset,
    }: {
        limit?: number | null;
        offset?: number | null;
    }): CancelablePromise<PaginatedResponse_litestar_dto__backend_AllCollectionResponseBody_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/collections/all',
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
     * @returns CreateCollectionResponseBody Document created, URL follows
     * @throws ApiError
     */
    public static createCollections({
        requestBody,
        comment,
    }: {
        requestBody: CreateCollectionCreateRequestRequestBody;
        /**
         * Optional comment for history
         */
        comment?: string | null;
    }): CancelablePromise<CreateCollectionResponseBody> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/collections',
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
     * @returns RetrieveCollectionResponseBody Request fulfilled, document follows
     * @throws ApiError
     */
    public static getCollection({ id }: { id: string }): CancelablePromise<RetrieveCollectionResponseBody> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/collections/{id}',
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
    public static deleteCollection({
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
            url: '/collections/{id}',
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
     * @returns UpdateCollectionResponseBody Request fulfilled, document follows
     * @throws ApiError
     */
    public static patchCollection({
        id,
        requestBody,
        comment,
    }: {
        id: string;
        requestBody: UpdateCollectionUpdateRequestRequestBody;
        /**
         * Optional comment for history
         */
        comment?: string | null;
    }): CancelablePromise<UpdateCollectionResponseBody> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/collections/{id}',
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
     * Ingest data for collection by collection id
     * @returns string Document created, URL follows
     * @throws ApiError
     */
    public static createCollectionIngest({ id, dropOld }: { id: string; dropOld: boolean }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/collections/{id}/ingest',
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
