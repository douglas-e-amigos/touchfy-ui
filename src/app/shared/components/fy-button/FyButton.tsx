import { ReactElement, ReactNode } from "react";

interface FyButtonProps {
    children: ReactNode;
    type?: "default" | "outline";
    onClick?: () => void;
}

export default function FyButton({
    children,
    type = "default",
    onClick,
}: FyButtonProps): ReactElement {
    const base = "px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer";

    const variants = {
        default: "bg-primary text-white hover:bg-primary/80",
        outline: "border border-primary text-primary bg-transparent hover:bg-primary/10",
    };

    return (
        <button className={`${base} ${variants[type]}`} onClick={onClick}>
            {children}
        </button>
    );
}