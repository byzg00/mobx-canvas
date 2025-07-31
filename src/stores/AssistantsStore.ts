import {action, computed, makeAutoObservable, makeObservable, observable} from 'mobx';

import { Assistant } from '@/types';
import { AssistantService } from '@/api/generated_api';
import { BaseStore } from '@/stores/BaseStore';

export class AssistantsStore extends BaseStore<Assistant> {
    constructor() {
        super();
        // makeObservable(this, {
        //     items: observable,
        //     all: computed,
        //     setIsBarking: action
        // });
        this.fetchListApi = () => AssistantService.getAssistantsAll({});
    }
}

export const assistantStore = new AssistantsStore();
