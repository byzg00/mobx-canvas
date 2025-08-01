'use client';

import { observer } from 'mobx-react-lite';

import { useStore } from '@/store';
import { Cards } from '@/entities/assistant/Cards';

export const CardsContainer = observer(() => {
    const { assistantsStore, promptsStore, collectionsStore } = useStore();

    return (
        <Cards
            assistants={assistantsStore.all}
            promptsStore={promptsStore}
            collectionsStore={collectionsStore}
            patchAssistant={assistantsStore.patchItem}
            removeAssistant={assistantsStore.removeItem}
        />
    );
});
