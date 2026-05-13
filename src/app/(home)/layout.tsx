import { ReactNode } from "react";
import { redirect } from "next/navigation";

export default async function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-black">
            {children}
        </div>
    );
}