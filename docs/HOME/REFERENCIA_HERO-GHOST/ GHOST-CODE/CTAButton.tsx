"use client";

import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function CTAButton({ href, children, className = "" }: CTAButtonProps) {
  return (
    <Link href={href} className={`cta-button ${className}`}>
      <span>{children}</span>
      <span className="icon-circle">
        <span>→</span>
      </span>
    </Link>
  );
}