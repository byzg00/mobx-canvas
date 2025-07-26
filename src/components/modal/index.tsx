/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import cn from 'classnames';

type Props = {
    children: string;
    close: () => void;
}

export const Modal = (props: Props) => {
    const { children, close } = props;

    return (
        <div
            className={cn(
                'flex',
                'items-center',
                'justify-center',
                'fixed',
                'w-[100vw]',
                'h-[100vh]',
            )}
        >
            <div
                className={cn(
                    'fixed',
                    'bg-slate-600',
                    'opacity-90',
                    'w-[100%]',
                    'h-[100%]',
                )}
                onClick={close}
            />
            <div
                className={cn(
                    'flex',
                    'p-4',
                    'rounded-lg',
                    'fixed',
                    'bg-white',
                    'min-w-[400px]',
                )}
            >
                {children}
            </div>
        </div>
    );
};
