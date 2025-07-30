import { makeAutoObservable } from 'mobx';

import { Assistant } from '@/types';
import { AssistantService } from '@/api/generated_api';

export class AssistantsStore {
    private assistants = new Map<string, Assistant>();

    constructor() {
        makeAutoObservable(this);
    }

    private add(assistant: Assistant) {
        this.assistants.set(assistant.id, assistant);
    }

    // public remove(id: string) {
    //     this.assistants.delete(id);
    // }

    public fetchList(): Promise<void> {
        return AssistantService.getAssistantsAll({})
            .then((result) => {
                result.objects.forEach((assistant: Assistant) => {
                    this.add(assistant);
                });
            });
    }

    public get all() {
        return Array.from(this.assistants.values());
    }

    public getById(id: string) {
        return this.assistants.get(id);
    }

    public hydrate(data: { assistants: Assistant[] }) {
        data.assistants.forEach((a) => this.add(a));
    }

    public toJSON() {
        return {
            assistants: this.all.map((item) => ({ ...item })),
        };
    }
}

export const assistantStore = new AssistantsStore();
