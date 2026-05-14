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
}: FyModalProps): React.ReactElement | null {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}>
            <div onClick={(event) => event.stopPropagation()}
                className="w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
                <FyArea>
                    {children}
                </FyArea>
            </div>
        </div>
    );
}