import React from 'react';

type HighlightTextProps = {
  text: string;
  highlight?: string;
};

// Componente para renderizar keyword com ghost-accent
export function HighlightText({ text, highlight }: HighlightTextProps) {
  if (!highlight) return <>{text}</>;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="text-primary font-semibold">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
