import { Collection } from '@/types';
import { CollectionService } from '@/api/generated_api';
import { BaseStore } from '@/stores/BaseStore';

export class CollectionsStore extends BaseStore<Collection> {
    constructor() {
        super();
        this.fetchListApi = () => CollectionService.getCollectionsAll({});
    }
}

export const collectionsStore = new CollectionsStore();
