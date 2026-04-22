import { ReactNode } from "react";
import { AuthBanner } from "./AuthBanner";


export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen">
            {/* Banner */}
            <AuthBanner/>

            {/* Formulário */}
            <div className="w-1/2 flex items-center justify-center bg-black">
                {children}
            </div>
        </div>
    );
}