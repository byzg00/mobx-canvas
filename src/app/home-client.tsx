'use client';

import { observer } from 'mobx-react-lite';

import { useStore } from '@/store';
import { AssistantCard } from '@/entities/assistant/Card';
import { Assistant } from '@/types';

const HomePage = observer(() => {
    const { assistantStore } = useStore();

    return (
        <div className="flex items-center justify-center p-[12px]">
            <div className="flex flex-row justify-center flex-wrap gap-[12px]">
                {assistantStore.all.map((assistant: Assistant) => (
                    <AssistantCard assistant={assistant} key={assistant.id} />
                ))}
            </div>
        </div>
    );
});

export default HomePage;
