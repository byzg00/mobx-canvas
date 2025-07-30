/** Отфильтровывает null и undefined элементы из массива и исключает их из возможных типов элементов */
export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}
