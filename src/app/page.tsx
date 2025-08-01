import { unstable_noStore as noStore } from 'next/cache';

import { initStore } from '@/stores';
import { StoreProvider } from '@/store';
import { CardsContainer } from '@/entities/assistant/CardsContainer';

noStore();

const Home = async () => {
    // const [showModal, setShowModal] = useState(false);
    // return (
    //     <div className="grid min-h-screen grid-rows-[20px_1fr_20px] place-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
    //         {'Some text '.repeat(50)}
    //         <Button onClick={() => setShowModal(true)}>Открыть окно</Button>
    //         {showModal && (
    //             <Modal close={() => setShowModal(false)}>
    //                 Модалка
    //             </Modal>
    //         )}
    //     </div>
    // );
    const store = initStore();
    await Promise.all([
        store.assistantsStore.fetchList(),
        store.promptsStore.fetchList(),
        store.collectionsStore.fetchList(),
    ]);

    const initialData = store.toJSON();

    return (
        <StoreProvider initialData={initialData}>
            <CardsContainer />
        </StoreProvider>
    );
};

export default Home;
