import cn from 'classnames';

type Props = {
    children: string;
    onClick?: () => void;
}

export const Button = (props: Props) => {
    const { children, onClick } = props;

    return (
        <div
            className={cn(
                'flex',
                'items-center',
                'justify-center',
                'bg-blue-500',
                'text-white',
                'px-4',
                'py-2',
                'rounded-md',
                'cursor-pointer',
                'hover:bg-blue-400',
                'active:bg-blue-700',
                'select-none',
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
