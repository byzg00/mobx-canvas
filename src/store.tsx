'use client';

import { createContext, useContext, useRef } from 'react';

import { RootStore, RootStoreHydration, initStore } from './stores';

const StoreContext = createContext<RootStore | null>(null);

export const StoreProvider = (props: {
    children: React.ReactNode;
    initialData: RootStoreHydration;
}) => {
    const {
        children,
        initialData,
    } = props;
    const storeRef = useRef<RootStore>(null);

    if (!storeRef.current) {
        storeRef.current = initStore(initialData);
    }

    return (
        <StoreContext.Provider value={storeRef.current}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = (): RootStore => {
    const store = useContext(StoreContext);
    if (!store) throw new Error('Missing StoreProvider');
    return store;
};
