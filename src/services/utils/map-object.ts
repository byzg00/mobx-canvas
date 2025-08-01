import { ValueOf } from '@/types';
import { notEmpty } from '@/services/utils/not-empty';

/**
 * Применяет функцию преобразования к каждой паре (ключ, значение) объекта и возвращает массив результатов.
 *
 * - Перебирает все собственные ключи объекта.
 * - Передаёт в функцию `mappingFn` ключ и значение.
 * - Возвращает массив значений, исключая `null` и `undefined`.
 *
 * @param obj Объект для итерации.
 * @param mappingFn Функция преобразования `(key, value) => result`.
 * @returns Массив результатов типа `MapValue[]`.
 *
 * @example
 * const user = { name: "Alice", age: 30 };
 * const result = mapObject(user, (key, value) => `${key}: ${value}`);
 * // result: ["name: Alice", "age: 30"]
 */
export const mapObject = <Obj extends object, MapValue>(
    obj: Obj,
    mappingFn: (key: keyof Obj, value: ValueOf<Obj>) => MapValue,
) => {
    const result = [];
    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const key in obj) {
        result.push(mappingFn(key, obj[key]));
    }
    return result.filter(notEmpty);
};

/**
 * Применяет функцию преобразования к каждой паре (ключ, значение) объекта и возвращает новый объект с теми же ключами, но преобразованными значениями.
 *
 * - Перебирает все собственные ключи объекта.
 * - Передаёт в функцию `mappingFn` ключ и значение.
 * - Возвращает объект `Record<keyof Obj, MapValue>`.
 *
 * @param obj Объект для итерации.
 * @param mappingFn Функция преобразования `(key, value) => newValue`.
 * @returns Новый объект с преобразованными значениями.
 *
 * @example
 * const user = { name: "Alice", age: 30 };
 * const uppercased = mapObjectToObject(user, (key, value) =>
 *   typeof value === "string" ? value.toUpperCase() : value
 * );
 * // uppercased: { name: "ALICE", age: 30 }
 */
export const mapObjectToObject = <Obj extends object, MapValue>(
    obj: Obj,
    mappingFn: (key: keyof Obj, value: ValueOf<Obj>) => MapValue,
) =>
    mapObject(obj, (_key) => ({
        key: _key,
        value: mappingFn(_key, obj[_key]),
    })).reduce<Record<keyof Obj, MapValue>>(
        (acc, { key, value }) => ({ ...acc, [key]: value }),
        {} as Record<keyof Obj, MapValue>,
    );
