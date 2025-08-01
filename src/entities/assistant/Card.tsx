import cn from 'classnames';
import dayjs from 'dayjs';
import { ChatBubbleOvalLeftEllipsisIcon, InboxStackIcon, TrashIcon } from '@heroicons/react/24/solid';

import { Assistant } from '@/types';
import { Button } from '@/components/button';
import { AssistantsStore } from '@/stores/AssistantsStore';

type Props = {
    assistant: Assistant;
    collectionName: string;
    promptName: string;
    patchAssistant: AssistantsStore['patchItem'];
    removeAssistant: AssistantsStore['removeItem'];
}

export const AssistantCard = (props: Props) => {
    const { assistant, collectionName, promptName, patchAssistant, removeAssistant } = props;
    return (
        <div
            className={cn(
                'flex',
                'flex-col',
                'gap-[24px]',
                'bg-slate-600',
                'p-[32px]',
                'text-white',
                'w-[300px]',
                'lg:w-[430px]',
                'rounded-lg',
            )}
        >
            {/* HEAD */}
            <div className={cn('flex', 'flex-row', 'justify-between')}>
                <div className={cn('flex', 'flex-col')}>
                    <div className={cn('font-bold', 'text-lg')}>
                        {assistant.name}
                    </div>
                    <div className={cn('text-xs', 'text-slate-300')}>
                        Создан {dayjs(assistant.createdAt).format('D MMM YYYY')}
                    </div>
                </div>
                <div className={cn('flex', 'flex-row', 'items-center', 'gap-[4px]')}>
                    <div className={cn(
                        'w-[8px]',
                        'h-[8px]',
                        'rounded-lg',
                        assistant.enabled ? 'bg-green-500' : 'bg-red-500',
                    )} />
                    <div>
                        {assistant.enabled ? 'Включен' : 'Выключен'}
                    </div>
                </div>
            </div>
            {/* BODY */}
            <div className="flex flex-col gap-3">
                <div className="flex justify-between text-base">
                    <div className="flex flex-row items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                            <InboxStackIcon className="size-5" />
                        </div>
                        {collectionName}
                    </div>
                </div>
                <div className="flex justify-between text-base">
                    <div className="flex flex-row items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                            <ChatBubbleOvalLeftEllipsisIcon className="size-5" />
                        </div>
                        {promptName}
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-3">
                <Button
                    variant={assistant.enabled ? 'outlined' : 'contained'}
                    onClick={() => patchAssistant(
                        assistant.id,
                        {
                            enabled: !assistant.enabled,
                        },
                    )}
                    className="flex-1"
                >
                    {assistant.enabled ? 'Выключить' : 'Включить'}
                </Button>
                <Button
                    color="danger"
                    onClick={() => removeAssistant(assistant.id)}
                >
                    <TrashIcon className="size-5" />
                </Button>
            </div>
        </div>
    );
};
