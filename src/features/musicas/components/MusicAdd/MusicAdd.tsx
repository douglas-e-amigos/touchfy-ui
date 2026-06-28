import FyButton from "@/src/shared/components/fy-button/FyButton";
import { Plus } from "lucide-react";

interface MusicAddProps {
  readonly onClick: () => void;
}

export default function MusicAdd({ onClick }: MusicAddProps) {
  return (
    <FyButton className="inline-flex h-11 items-center gap-2" onClick={onClick}>
      <Plus aria-hidden="true" size={18} />
      <span>Adicionar música</span>
    </FyButton>
  );
}
