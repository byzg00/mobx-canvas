import { Assistant } from '@/types';
import { AssistantService } from '@/api/generated_api';
import { BaseStore } from '@/stores/BaseStore';

export class AssistantsStore extends BaseStore<Assistant> {
    constructor() {
        super();
        this.fetchListApi = () => AssistantService.getAssistantsAll({});
        this.patchItemApi = (id: string, data: Partial<Assistant>) => (
            AssistantService.patchAssistant({
                id,
                requestBody: data,
            })
        );
        this.removeItemApi = (id: string) => (
            AssistantService.deleteAssistant({
                id,
            })
        );
    }
}

export const assistantsStore = new AssistantsStore();
