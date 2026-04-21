import { Check } from "lucide-react";

export function AuthBanner() {
  return (
    <div className="w-1/2 min-h-screen flex flex-col justify-between p-16 
      bg-linear-to-br from-pink-500 via-purple-500 to-indigo-600 text-white">
      <div>
        <h1 className="text-6xl font-bold leading-tight mb-10">
          Descubra um <br />
          mundo de <br />
          música.
        </h1>
        <ul className="space-y-6">
          <li className="flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
              <Check size={16} />
            </span>
            <span className="text-lg">
              Acesso ilimitado a milhões de músicas
            </span>
          </li>
          <li className="flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
              <Check size={16} />
            </span>
            <span className="text-lg">
              Playlists personalizadas com IA
            </span>
          </li>
          <li className="flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
              <Check size={16} />
            </span>
            <span className="text-lg">
              Ouça offline, sem anúncios
            </span>
          </li>
        </ul>
      </div>
      <div className="text-sm text-white/70">
        © 2026 Touchfy. Todos os direitos reservados.
      </div>
    </div>
  );
}