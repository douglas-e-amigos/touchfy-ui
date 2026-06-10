import { ReactElement, ReactNode } from "react";

interface FyAreaProps {
    children: ReactNode;
    color?: 'gray' | 'red'
}


export default function FyArea({
    children,
    color = 'gray',
}: Readonly<FyAreaProps>): ReactElement {
    const colorMap = {
        gray: {
            bg: "bg-[#18181B]",
            border: "border-[#27272A]",
        },
        red: {
            bg: "bg-danger-black",
            border: "border-danger",
        },
    };
    const styles = colorMap[color];

    return (
        <div className={`${styles.bg} ${styles.border} rounded-2xl p-5`}>
            {children}
        </div>
    )
}
