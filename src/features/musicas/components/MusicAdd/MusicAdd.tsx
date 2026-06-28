import FyButton from "@/src/shared/components/fy-button/FyButton";
import { Plus } from "lucide-react";

export default function MusicAdd() {
  return (
    <FyButton className="inline-flex h-11 items-center gap-2">
      <Plus aria-hidden="true" size={18} />
      <span>Adicionar música</span>
    </FyButton>
  );
}
