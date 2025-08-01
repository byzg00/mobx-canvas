import { mapObject } from '@/services/utils/map-object';
import { BaseStore } from '@/stores/BaseStore';

import { PromptsStore } from './PromptsStore';
import { AssistantsStore } from './AssistantsStore';
import { CollectionsStore } from './CollectionsStore';

type StoreWithSerialization<T> = {
    hydrate(data: T): void;
    toJSON(): T;
};

type StoreData<Store extends BaseStore<{ id: string }>> = ReturnType<Store['toJSON']>;
type StoreMapValue<Store extends BaseStore<{ id: string }>> = {
    instance: Store;
    data: StoreData<Store>;
}

type StoreMap = {
    assistantsStore: StoreMapValue<AssistantsStore>;
    promptsStore: StoreMapValue<PromptsStore>;
    collectionsStore: StoreMapValue<CollectionsStore>;
};

type StoreInstances = {
    [K in keyof StoreMap]: StoreMap[K]['instance'];
};

type StoreHydration = {
    [K in keyof StoreMap]: StoreMap[K]['data'];
};

const storeFactories: {
    [K in keyof StoreMap]: () => StoreMap[K]['instance'];
} = {
    assistantsStore: () => new AssistantsStore(),
    promptsStore: () => new PromptsStore(),
    collectionsStore: () => new CollectionsStore(),
};

export class RootStore {
    public readonly assistantsStore!: AssistantsStore;

    public readonly promptsStore!: PromptsStore;

    public readonly collectionsStore!: CollectionsStore;

    private readonly storesMap: StoreInstances;

    constructor() {
        this.storesMap = Object.keys(storeFactories).reduce((acc, key) => {
            const typedKey = key as keyof StoreMap;
            return {
                ...acc,
                [typedKey]: storeFactories[typedKey](),
            };
        }, {} as StoreInstances);
        Object.assign(this, this.storesMap);
    }

    public hydrate(data?: Partial<StoreHydration>): void {
        if (!data) return;

        (Object.keys(data) as (keyof StoreHydration)[]).forEach((key) => {
            const store = this.storesMap[key];
            const storeData = data[key];

            (store as StoreWithSerialization<typeof storeData>).hydrate(storeData);
        });
    }

    public toJSON(): StoreHydration {
        const entries = mapObject(this.storesMap, (key, store) => {
            return [key, store.toJSON()];
        });

        return Object.fromEntries(entries);
    }
}

let store: RootStore | null = null;

export function initStore(initialData?: Partial<StoreHydration>): RootStore {
    const _store = store ?? new RootStore();

    if (initialData) {
        _store.hydrate(initialData);
    }

    if (typeof window === 'undefined') return _store;
    if (!store) store = _store;

    return store;
}
