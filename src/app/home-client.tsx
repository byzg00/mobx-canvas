'use client';

import { observer } from 'mobx-react-lite';

import { useStore } from '@/store';

const HomePage = observer(() => {
    const { assistantStore } = useStore();

    console.log(assistantStore);
    return (
        <div>
            <h1>Assistants:</h1>
            <pre>{JSON.stringify(assistantStore.all, null, 2)}</pre>
        </div>
    );
});

export default HomePage;
