export interface DependencyNode {
    name: string;
    originalName: string;
    roots: Set<string>;
    parents: Set<string>;
    children: Map<string, string>;
    copied?: boolean;
}

export type DependencyMap = Map<string, DependencyNode>;

export type OpenAPISchemaObject = {
    type?: string;
    required?: string[];
    properties?: Record<string, OpenAPISchemaObject>;
    items?: OpenAPISchemaObject;
    discriminator?: {
        propertyName?: string;
        [key: string]: unknown;
    };
    xml?: {
        name?: string;
        [key: string]: unknown;
    };
    $ref?: string;
    enum?: unknown[];
    example?: unknown;
    title?: string;
    description?: string;
    format?: string;
    [key: string]: unknown;
};

type MediaTypeObject = {
    schema?: OpenAPISchemaObject;
};

type ResponseObject = {
    content?: {
        'application/json'?: MediaTypeObject;
    };
};

type RequestBodyObject = {
    content?: {
        'application/json'?: MediaTypeObject;
    };
};

type ParameterObject = {
    name: string;
    [key: string]: unknown;
};

type PathMethodObject = {
    parameters?: ParameterObject[];
    requestBody?: RequestBodyObject;
    responses?: Record<string, ResponseObject>;
    [key: string]: unknown;
};

type PathsObject = Record<string, Record<string, PathMethodObject>>;

type ComponentsObject = {
    schemas?: Record<string, OpenAPISchemaObject>;
};

export type OpenAPIObject = {
    paths?: PathsObject;
    components?: ComponentsObject;
    [key: string]: unknown;
};
