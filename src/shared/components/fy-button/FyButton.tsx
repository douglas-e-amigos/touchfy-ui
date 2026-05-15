import { ReactElement, ReactNode } from "react";

interface FyButtonProps {
    children: ReactNode;
    type?: 'default' | 'outline' | 'ghost';
    color?: 'primary' | 'red';
    className?: string;
    onClick?: () => void;
}

type ButtonColor = NonNullable<FyButtonProps["color"]>;

type StyleButton = {
    default: Record<ButtonColor, string>;
    outline: Record<ButtonColor, string>;
    ghost: string;
};

export default function FyButton({
    children,
    type = "default",
    color = "primary",
    className,
    onClick,
}: FyButtonProps): ReactElement | null {
    if (isInvalidChildren(children)) {
        console.error("Texto do botão não pode ser vazio");
        return null;
    }

    const base =
        "px-4 py-2 rounded-md font-semibold transition-colors duration-200 cursor-pointer";

    const styles = {
        default: {
            primary: "bg-primary text-white hover:bg-primary/80",
            red: "bg-danger text-white hover:bg-danger/80",
        },
        outline: {
            primary: "border border-primary text-primary bg-transparent hover:bg-primary/10",
            red: "border border-danger text-danger bg-transparent hover:bg-danger/10",
        },
        ghost: "bg-transparent text-gray-400 hover:text-white",
    } satisfies StyleButton;
    
    const variantClass = type === "ghost" ? styles.ghost : styles[type][color];

    return (
        <button className={`${base} ${variantClass} ${className || ''}`} onClick={onClick}>
            {children}
        </button>
    );
}

function isInvalidChildren(children: ReactNode): boolean {
    if (children === null || children === undefined) return true;

    if (typeof children === "boolean") return true;

    if (typeof children === "string" && children.trim().length <= 0) {
        return true;
    }

    return false;
}