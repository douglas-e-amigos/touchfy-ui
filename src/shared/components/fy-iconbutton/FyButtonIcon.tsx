'use client';

import FyButton from '../fy-button/FyButton';
import { ReactNode } from 'react';
import clsx from "clsx";

interface FyButtonIconProps {
    icon: ReactNode;
    onClick?: () => void;
    variant?: "default" | "outline" | "ghost";
    className?: string;
}

export default function FyButtonIcon({ 
    onClick, 
    variant,
    icon, 
    className,
}: FyButtonIconProps) {
    return (
        <FyButton
            onClick={onClick}
            className={clsx("flex items-center justify-center p-2 rounded-full", className)}
            type={variant}
        >
            {icon}
        </FyButton>
    );
}
