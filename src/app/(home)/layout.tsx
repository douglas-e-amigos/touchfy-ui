import { ReactNode } from "react";
import FySidebar from "@/src/shared/components/fy-sidebar/FySidebar";

export default async function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-black lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
            <div className="lg:h-screen">
                <FySidebar />
            </div>
            <div className="min-w-0">
                {children}
            </div>
        </div>
    );
}
