import { observable, action, computed, makeObservable } from 'mobx';

export class BaseStore<Entity extends { id: string }> {
    public items = new Map<string, Entity>();

    protected fetchListApi: (() => Promise<{ objects: Entity[]; }>) | undefined;

    protected patchItemApi: ((id: string, data: Partial<Entity>) => Promise<Entity>) | undefined;

    protected removeItemApi: ((id: string) => Promise<void>) | undefined;

    constructor() {
        makeObservable(this, {
            items: observable,
            all: computed,
            add: action,
            patchItem: action.bound,
            removeItem: action.bound,
        });
    }

    public add(item: Entity) {
        this.items.set(item.id, item);
    }

    public removeItem(id: string) {
        return (this.removeItemApi?.(id)
            .then(() => {
                this.items.delete(id);
            })) || Promise.reject();
    }

    public fetchList(): Promise<void> {
        return (this.fetchListApi?.()
            .then((result) => {
                result.objects.forEach((item: Entity) => {
                    this.add(item);
                });
            })) || Promise.reject();
    }

    public patchItem(id: string, data: Partial<Entity>): Promise<void> {
        return (this.patchItemApi?.(id, data)
            .then((result) => {
                const item = this.items.get(id);
                if (item) {
                    Object.assign(item, result);
                }
            })) || Promise.reject();
    }

    public get all() {
        return Array.from(this.items.values());
    }

    public getById(id: string) {
        return this.items.get(id);
    }

    public hydrate(data: { items: Entity[] }) {
        data.items.forEach((a) => this.add(a));
    }

    public toJSON() {
        return {
            items: JSON.parse(JSON.stringify(this.all)),
        };
    }
}
