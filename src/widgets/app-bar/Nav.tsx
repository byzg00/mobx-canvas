'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    link: {
        href: string;
        label: string;
    };
}

export const Nav = (props: Props) => {
    const { link } = props;
    const pathname = usePathname();

    return (
        <li key={link.href} className={pathname === link.href ? 'font-semibold' : ''}>
            <Link href={link.href}>{link.label}</Link>
        </li>
    );
};
