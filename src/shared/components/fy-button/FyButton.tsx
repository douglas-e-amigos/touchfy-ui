import { ReactElement, ReactNode } from "react";

interface FyButtonProps {
    children: ReactNode;
    type?: 'default' | 'outline';
    color?: 'primary' | 'red'
    onClick?: () => void;
}

export default function FyButton({
    children,
    type = "default",
    color = "primary",
    onClick,
}: FyButtonProps): ReactElement | null {

    const base =
        "px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer";

    const styles = {
        primary: {
            default: "bg-primary text-white hover:bg-primary/80",
            outline: "border border-primary text-primary bg-transparent hover:bg-primary/10",
        },
        red: {
            default: "bg-danger text-white hover:bg-danger/80",
            outline: "border border-danger text-danger bg-transparent hover:bg-danger/10",
        },
    };
    
    const variantClass = styles[color][type];

    return (
        <button className={`${base} ${variantClass}`} onClick={onClick}>
            {children}
        </button>
    );
}