import React, { useState, useEffect, useRef } from 'react';

interface DeleteModalProps {
    title?: string;
    content?: string;
    onClickOk(): void;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ title, content, onClickOk }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const trigger = useRef<HTMLButtonElement | null>(null);
    const modal = useRef<HTMLDivElement | null>(null);

    // Close modal on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!modal.current || !trigger.current) return;
            if (
                modalOpen &&
                !modal.current.contains(target as Node) &&
                !trigger.current.contains(target as Node)
            ) {
                setModalOpen(false);
            }
        };

        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    }, [modalOpen]);

    // Close modal on Esc key press
    useEffect(() => {
        const keyHandler = ({ key }: KeyboardEvent) => {
            if (modalOpen && key === "Escape") {
                setModalOpen(false);
            }
        };

        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, [modalOpen]);

    return (
        <div>
            <button
                ref={trigger}
                onClick={() => setModalOpen(!modalOpen)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
                Delete Project
            </button>
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                    <div
                        ref={modal}
                        className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg"
                    >
                        <h3 className="pb-2 text-xl font-bold text-black">{title}</h3>
                        <span className="mx-auto mb-4 inline-block h-1 w-16 rounded bg-blue-500"></span>
                        <p className="mb-6 text-gray-700">{content}</p>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="w-1/2 rounded border border-green-300 bg-gray-200 p-2 text-black transition hover:bg-red-300"
                            >
                                Cancel
                            </button>
                            <button className="w-1/2 rounded border border-blue-500 bg-blue-500 p-2 text-white transition hover:bg-blue-600"
                                onClick={() => {
                                    onClickOk();
                                    setModalOpen(false)
                                }}>
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteModal;