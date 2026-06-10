"use client";

import { ReactNode, useEffect } from "react";
import FyArea from "../fy-area/FyArea";

interface FyModalProps {
  readonly children: ReactNode;
  readonly open: boolean;
  readonly onClose: () => void;
}

export default function FyModal({
  children,
  open,
  onClose,
}: FyModalProps): React.ReactElement | null {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    function handleEsc(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <dialog
      open
      aria-modal="true"
      className="fixed inset-0 z-50 h-full w-full max-w-none border-0 bg-transparent p-0"
    >
      <div className="relative flex h-full w-full items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <button
          type="button"
          aria-label="Fechar modal"
          className="absolute inset-0 h-full w-full cursor-default"
          onClick={onClose}
        />

        <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
          <FyArea>{children}</FyArea>
        </div>
      </div>
    </dialog>
  );
}
