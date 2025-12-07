'use client';

import React from 'react';

type PrimaryButtonProps = React.ComponentProps<'a'> & {
  children: React.ReactNode;
};

const PrimaryButton = React.forwardRef<HTMLAnchorElement, PrimaryButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-3 rounded-full bg-[#0057FF] px-8 py-4 text-base font-semibold text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-offset-white focus-visible:ring-[#0057FF]/70 shadow-xl shadow-[#0057FF]/20 hover:bg-[#0042c2]';

    const composedClassName = `${baseClasses} ${className}`.trim();

    return (
      <a ref={ref} className={composedClassName} {...props}>
        {children}
      </a>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
