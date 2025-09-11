import React, { FC, ReactNode, ButtonHTMLAttributes } from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}


export const Button: FC<ButtonProps> = ({ children, className = "", ...props }) => {
    return (
        <button
            className={`px-4 py-2 rounded-2xl font-medium shadow-sm bg-teal-500 text-white hover:bg-teal-600 transition dark:bg-teal-600 dark:hover:bg-teal-500 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};