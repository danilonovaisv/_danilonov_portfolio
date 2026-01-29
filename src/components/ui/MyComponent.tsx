import React, { useEffect } from 'react';
import gsap from 'gsap';

export default function MyComponent(): React.ReactElement {
  useEffect(() => {
    const animation = gsap.fromTo(
      '.my-element',
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );

    return () => {
      if (animation && typeof (animation as any).kill === 'function') {
        (animation as any).kill();
      }
    };
  }, []);

  return <div className="my-element">Hello World</div>;
}
