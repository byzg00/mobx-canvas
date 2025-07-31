import {Assistant} from "@/types";
import cn from "classnames";
import dayjs from "dayjs";

type Props = {
    assistant: Assistant;
}

export const AssistantCard = (props: Props) => {
    const { assistant } = props;
    return (
        <div
            className={cn(
                'flex-column',
                'bg-slate-600',
                'p-[32px]',
                'text-white',
                'w-[300px]',
                'lg:w-[430px]',
                'rounded-lg',
            )}
        >
            <div className={cn('flex-row')}>
                <div className={cn('flex', 'flex-col')}>
                    <div className={cn('font-bold', 'text-lg')}>
                        {assistant.name}
                    </div>
                    <div className={cn('text-xs', 'text-slate-300')}>
                        Создан {dayjs(assistant.createdAt).format('D MMM YYYY')}
                    </div>
                </div>
            </div>
        </div>
    );
}
