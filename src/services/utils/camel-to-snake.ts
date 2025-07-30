export function camelToSnake(string = '') {
    return string
        .replace(/([A-Z])/g, (match, group) => `_${group.toLowerCase()}`)
        .replace(/^_/, '');
}
