'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    children: React.ReactNode;
    asExternal?: boolean; // Added for compatibility
    target?: string;
}

export const Button = ({
    href,
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    asExternal,
    target,
    ...props
}: ButtonProps) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none group';

    const variants = {
        primary: 'bg-[#0057FF] text-white hover:bg-[#0046CC]',
        secondary: 'bg-white text-black hover:bg-gray-100',
        outline: 'border border-white/20 text-white hover:bg-white/10',
        ghost: 'text-white hover:bg-white/10',
        link: 'text-[#0057FF] hover:underline p-0 h-auto',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        icon: 'p-2',
    };

    const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        if (asExternal || target === '_blank' || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return (
                <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={combinedClasses}>
                    {children}
                </a>
            );
        }
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
};
