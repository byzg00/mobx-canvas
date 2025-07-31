import { observable, action, computed, makeObservable } from 'mobx';

export class BaseStore<Entity extends { id: string }> {
    public items = new Map<string, Entity>();

    protected fetchListApi: (() => Promise<{ objects: Entity[]; }>) | undefined;

    constructor() {
        makeObservable(this, {
            items: observable,
            all: computed,
            add: action,
        });
    }

    public add(item: Entity) {
        this.items.set(item.id, item);
    }

    // public remove(id: string) {
    //     this.items.delete(id);
    // }

    public fetchList(): Promise<void> {
        return (this.fetchListApi?.()
            .then((result) => {
                result.objects.forEach((item: Entity) => {
                    this.add(item);
                });
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
            items: this.all.map((item) => ({ ...item })),
        };
    }
}
