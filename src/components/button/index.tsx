import cn from 'classnames';

type Props = {
    children: string | React.ReactNode;
    variant?: 'outlined' | 'contained';
    color?: 'default' | 'success' | 'warning' | 'danger';
    onClick?: () => void;
    className?: string;
}

export const Button = (props: Props) => {
    const {
        children,
        onClick,
        className,
        variant = 'contained',
        color = 'default',
    } = props;

    return (
        <div
            className={cn(
                'flex',
                'items-center',
                'justify-center',
                {
                    'bg-blue-500': variant === 'contained' && color === 'default',
                    'bg-green-500': variant === 'contained' && color === 'success',
                    'bg-orange-400': variant === 'contained' && color === 'warning',
                    'bg-red-500': variant === 'contained' && color === 'danger',
                    'border-blue-500': color === 'default',
                    'border-green-500': color === 'success',
                    'border-orange-400': color === 'warning',
                    'border-red-500': color === 'danger',
                    'hover:bg-blue-400': color === 'default',
                    'hover:bg-green-400': color === 'success',
                    'hover:bg-orange-400': color === 'warning',
                    'hover:bg-red-400': color === 'danger',
                    'active:bg-blue-700': color === 'default',
                    'active:bg-green-700': color === 'success',
                    'active:bg-orange-600': color === 'warning',
                    'active:bg-red-700': color === 'danger',
                },
                'border',
                'text-white',
                'px-4',
                'py-2',
                'rounded-lg',
                'cursor-pointer',
                'select-none',
                className,
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
