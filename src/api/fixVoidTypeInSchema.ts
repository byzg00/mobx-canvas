export const fixVoidTypeInSchema = (schema: string) => {
    return schema.replace(/"items":\s?\{\}/g, '"items": {"type": "string"}');
};
