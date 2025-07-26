'use client';

import { useState } from 'react';

import { Button } from '@/components/button';
import { Modal } from '@/components/modal';

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] place-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
            {'Some text '.repeat(50)}
            <Button onClick={() => setShowModal(true)}>Открыть окно</Button>
            {showModal && (
                <Modal close={() => setShowModal(false)}>
                    Модалка
                </Modal>
            )}
        </div>
    );
}
