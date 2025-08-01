import { AssistantCard } from '@/entities/assistant/Card';
import { Assistant } from '@/types';
import { PromptsStore } from '@/stores/PromptsStore';
import { CollectionsStore } from '@/stores/CollectionsStore';
import {AssistantsStore} from "@/stores/AssistantsStore";

type Props = {
    assistants: Assistant[];
    promptsStore: PromptsStore;
    collectionsStore: CollectionsStore;
    patchAssistant: AssistantsStore['patchItem'];
    removeAssistant: AssistantsStore['removeItem'];
}

export const Cards = (props: Props) => {
    const { assistants, promptsStore, collectionsStore, patchAssistant, removeAssistant } = props;

    return (
        <div className="flex flex-col items-center justify-center p-[12px]">
            <p><b>Ассистенты</b></p>
            <div className="flex flex-row flex-wrap gap-[12px]">
                {assistants.map((assistant: Assistant) => (
                    <AssistantCard
                        assistant={assistant}
                        key={assistant.id}
                        promptName={promptsStore.getById(assistant.promptId)?.name || ''}
                        collectionName={collectionsStore.getById(assistant.collectionId)?.name || ''}
                        patchAssistant={patchAssistant}
                        removeAssistant={removeAssistant}
                    />
                ))}
            </div>
        </div>
    );
};
