type JSONData = string | number | boolean | null | JSONData[] | { [key: string]: JSONData };
// @ts-ignore
const genericTypeRegex = /^(?<type>.*?)`1\[\[(?<arg>.*)]][^\]]*$/;

function getShortTypeName(str: string) {
    if (str.includes(',')) {
        const typeName = str.split(',')[0];
        const parts = typeName.split('.');
        return parts[parts.length - 1];
    }
    const parts = str.split('.');
    return parts[parts.length - 1];
}

function processTypeString(str: string) {
    const parts: string[] = [];

    function traverse(part: string) {
        if (genericTypeRegex.test(part)) {
            const matches = genericTypeRegex.exec(part);
            const { type, arg } = matches?.groups ?? {};
            parts.push(getShortTypeName(type));
            traverse(arg);
        } else {
            parts.push(getShortTypeName(part));
        }
    }

    traverse(str);

    return parts.map((part) => (part === 'IReadOnlyCollection' ? 'Array' : part)).join('.');
}

export function fixDotNetGenericsInSchema(node: JSONData, removePublicPrefix: boolean) {
    if (node === null || typeof node !== 'object') {
        return;
    }
    if (Array.isArray(node)) {
        node.forEach((item) => {
            fixDotNetGenericsInSchema(item, removePublicPrefix);
        });
        return;
    }
    Object.entries(node).forEach(([key, value]) => {
        if (key === '$ref' && typeof value === 'string' && value.includes('`1')) {
            const newName = processTypeString(value.replace('#/components/schemas/', ''));
            node[key] = `#/components/schemas/${newName}`;
        }
        if (key.includes('`1')) {
            const newKey = processTypeString(key);
            node[newKey] = node[key];
            delete node[key];
        }

        if (removePublicPrefix && key.startsWith('/public/')) {
            const newKey = key.replace(/^\/public\//, '/');
            node[newKey] = node[key];
            delete node[key];
        }

        if (value !== null && typeof value === 'object' && !Array.isArray(value) && value.type === 'integer') {
            delete value.pattern;
            if (Array.isArray(value.enum)) {
                value.enum = value.enum.map((enumValue) =>
                    typeof enumValue === 'string' ? parseInt(enumValue, 10) : enumValue,
                );
            }
        }
        if (value !== null && typeof value === 'object' && !Array.isArray(value) && value.type === 'string') {
            delete value.allOf;
        }

        fixDotNetGenericsInSchema(value, removePublicPrefix);
    });
}
