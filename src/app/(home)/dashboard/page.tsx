"use client";

import { useRouter } from "next/navigation";
import { authService } from "../../features/usuario/services/auth.service"

export default function Dashboard() {
    const router = useRouter();

    const logout = async () => {
        await authService.logout();
        router.push('/login');
    }

    return (
        <div>
            <h1 className="text-2xl">Dashboard temporário super legal!</h1>
            <button className="bg-red-600 text-white cursor-pointer p-2 rounded-2xl" onClick={logout}>Sair</button>
        </div>
    )
}