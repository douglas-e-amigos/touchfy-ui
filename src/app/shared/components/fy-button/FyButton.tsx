import { ReactElement, ReactNode } from "react";

interface FyButtonProps {
    children: ReactNode;
    type?: "default" | "outline" | "ghost";
    className?: string;
    onClick?: () => void;
}

export default function FyButton({
    children,
    type = "default",
    onClick,
    className
}: FyButtonProps): ReactElement {
    const base = "px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer";

    const variants = {
        default: "bg-primary text-white hover:bg-primary/80",
        outline: "border border-primary text-primary bg-transparent hover:bg-primary/10",
        ghost: "bg-transparent text-gray-400 hover:text-white"
    };

    return (
        <button className={`${base} ${variants[type]} ${className || ''}`} onClick={onClick}>
            {children}
        </button>
    );
}