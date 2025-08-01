import { Prompt } from '@/types';
import { PromptService } from '@/api/generated_api';
import { BaseStore } from '@/stores/BaseStore';

export class PromptsStore extends BaseStore<Prompt> {
    constructor() {
        super();
        this.fetchListApi = () => PromptService.getPromptsAll({});
    }
}

export const promptsStore = new PromptsStore();
