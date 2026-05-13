"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authService } from "../../features/usuario/services/auth.service"
import { UsuarioResponse } from "../../features/usuario/models/dto.model";
import { usuarioService } from "../../features/usuario/services/usuario.service";

export default function Dashboard() {
    const router = useRouter();
    const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);

    useEffect(() => {
        usuarioService.buscarUsuarioLogado()
            .then(setUsuario)
            .catch(console.error);
    }, []);

    const logout = async () => {
        await authService.logout();
        router.push('/login');
    }

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl">Dashboard temporário super legal!</h1>
            {usuario?.id ? (
                <Link
                    href={`/users/${usuario.id}/profile`}
                    className="w-fit rounded-2xl bg-primary px-4 py-2 font-semibold text-white"
                >
                    Ir para meu perfil
                </Link>
            ) : null}
            <button className="bg-red-600 text-white cursor-pointer p-2 rounded-2xl" onClick={logout}>Sair</button>
        </div>
    )
}