/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateSourceRequestBody = {
    sourceTypeId: string;
    isDirectory?: boolean;
    dropOld?: boolean;
    ids?: Array<string>;
    excludeIds?: Array<string>;
    preprocessingSteps?: Array<string>;
    sourceSettings: Record<string, any>;
    name: string;
};
