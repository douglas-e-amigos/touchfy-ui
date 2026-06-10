'use client';

import { ReactNode, useEffect } from 'react';
import FyArea from '../fy-area/FyArea';

interface FyModalProps {
    children: ReactNode;
    open: boolean;
    onClose: () => void;
}

export default function FyModal({
    children,
    open,
    onClose,
}: Readonly<FyModalProps>): React.ReactElement | null {
    useEffect(() => {
        function handleEsc(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        if (open) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <dialog
            open
            className="fixed inset-0 z-50 flex h-full w-full max-w-none items-center justify-center border-0 bg-black/50 p-4 backdrop-blur-sm"
            onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()}
                className="w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
                <FyArea>
                    {children}
                </FyArea>
            </div>
        </dialog>
    );
}
