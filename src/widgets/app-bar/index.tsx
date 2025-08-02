import { Nav } from './Nav';

const links = [
    {
        href: '/',
        label: 'Home',
    },
    {
        href: '/board',
        label: 'Board',
    },
];

export const AppBar = async () => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
                <div className="text-xl font-semibold">Brand</div>
                <ul className="flex gap-6 text-sm font-medium text-gray-700">
                    {links.map((link) => (
                        <Nav link={link} key={link.href} />
                    ))}
                </ul>
            </nav>
        </header>
    );
};
