import { ValueOf } from '@/types';
import { notEmpty } from '@/services/utils/not-empty';

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
