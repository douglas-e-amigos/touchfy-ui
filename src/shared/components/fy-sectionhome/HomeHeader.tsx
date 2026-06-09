import FyDate from "../fy-date/FyDate";
import FySaudacao from "../fy-saudacao/FySaudacao";
import { getDateFormat, getHour } from "../../utils/date";

export default function HomeHeader() {
  return (
    <header className="w-full overflow-hidden bg-gradient-to-b from-[#ec268f]/30 via-[#ec268f]/10 to-transparent p-5 shadow-2xl shadow-black/40 md:p-8">
      <section className="mb-6 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <FyDate data={getDateFormat()} />
          <FySaudacao hora={getHour()} />

          <p className="max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
            Pronto para ouvir música? Confira o que preparamos para você.
          </p>
        </div>
      </section>
    </header>
  );
}
