'use client';

import clsx from 'clsx';
import { Menu, User, LogOut } from 'lucide-react';
import NavLinks from './nav-links';
import FyButtonIcon from '../fy-iconbutton/FyButtonIcon';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function FySidebar({
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(true);
  return (
    <>
      {/* Botão menu */}
      <div className="fixed top-4 left-4 z-50">
        <FyButtonIcon
          variant="outline"
          icon={<Menu size={20} />}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseEnter={() => {
          if (window.innerWidth >= 992) {
            setIsOpen(true);
          }
        }}
        className={clsx(
          'fixed top-0 left-0 z-50 h-full bg-black p-4 transition-transform duration-300',
          {
            'translate-x-0 w-64': isOpen,
            '-translate-x-full': !isOpen,
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
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-zinc-800 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Perfil
                </button>

                {/* Sair */}
                <button
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-zinc-800 transition-colors"
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