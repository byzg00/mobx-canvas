import { AssistantsStore } from './AssistantsStore';

export type RootStoreHydration = {
    assistantStore: ReturnType<AssistantsStore['toJSON']>;
};

export class RootStore {
    public assistantStore: AssistantsStore;

    constructor() {
        this.assistantStore = new AssistantsStore();
    }

    public hydrate(data?: RootStoreHydration) {
        if (data) {
            this.assistantStore.hydrate(data.assistantStore);
        }
    }

    public toJSON(): RootStoreHydration {
        return {
            assistantStore: this.assistantStore.toJSON(),
        };
    }
}

let store: RootStore | null = null;

export function initStore(initialData?: RootStoreHydration): RootStore {
    const _store = store ?? new RootStore();

    if (initialData) {
        _store.hydrate(initialData);
    }

    if (typeof window === 'undefined') return _store;
    if (!store) store = _store;

    return store;
}
