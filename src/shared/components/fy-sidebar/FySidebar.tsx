'use client';

import clsx from 'clsx';
import { Menu, User, LogOut } from 'lucide-react';
import NavLinks from './nav-links';
import FyButtonIcon from '../fy-iconbutton/FyButtonIcon';
import { useState } from 'react';
import { authService } from '@/src/features/usuario/services/auth.service';
import { useRouter } from 'next/navigation';

export default function FySidebar() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSidebarToggle = () => {
    if (isSidebarOpen) {
      setIsUserMenuOpen(false);
    }

    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
    setIsUserMenuOpen(false);
  };  

  const logout = async () => {
    await authService.logout();
    router.push("/login");
  };

  return (
    <>
      {/* Botão menu */}
      <div className="fixed top-4 left-4 z-[60] lg:hidden">
        <FyButtonIcon
          variant="outline"
          icon={<Menu size={20} />}
          onClick={handleSidebarToggle}
        />
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={handleSidebarClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 z-50 h-full w-64 max-w-[85vw] bg-black p-4 transition-transform duration-300 lg:translate-x-0',
          {
            'translate-x-0': isSidebarOpen,
            '-translate-x-full': !isSidebarOpen,
          }
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-pink-500 mb-8">
            Melody
          </h1>

          {/* Navegação */}
          <NavLinks />

          {/* Usuário */}
          <div className="mt-auto pt-4 border-t border-zinc-800 relative">

            {/* Botão usuário */}
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
                <User className="w-5 h-5 text-pink-500" />
              </div>

              {/* Informações */}
              <div className="flex flex-col text-left overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  Usuário
                </p>

                <p className="text-xs text-zinc-400 truncate">
                  user@example.com
                </p>
              </div>
            </button>

            {/* Card */}
            {isUserMenuOpen && (
              <div className="absolute bottom-20 left-0 w-50 rounded-lg border border-zinc-800 bg-zinc-900 shadow-lg overflow-hidden">

                {/* Header */}
                <div className="px-4 py-3 border-b border-zinc-800">
                  <p className="text-sm font-medium text-white">
                    Minha Conta
                  </p>
                </div>

                {/* Perfil */}
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-zinc-800 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Perfil
                </button>

                {/* Sair */}
                <button
                  type="button"
                  className="w-full cursor-pointer flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-zinc-800 transition-colors"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
