---
description: manifest
---

# Workflow: Manifesto Section (Smooth Reveal, No Scroll Expansion)

## Visual Concept

- The Manifesto section appears with a **smooth reveal animation** when it enters the viewport.
- The video is the focal element, animated with a subtle fade‑in and scale.
- Transition from Hero to Manifesto is a clear section change, **not** a continuous expansion of the Hero thumbnail.

## Implementation Strategy (`ManifestoSection.tsx`)

1. **Section Wrapper**

   ```tsx
   // src/components/home/ManifestoSection.tsx
   'use client';
   import { motion, useInView } from 'framer-motion';
   import ManifestoVideo from './ManifestoVideo';

   export default function ManifestoSection() {
     const ref = React.useRef(null);
     const inView = useInView(ref, { once: true, margin: '-100px' });

     const variants = {
       hidden: { opacity: 0, scale: 0.95, y: 20 },
       visible: { opacity: 1, scale: 1, y: 0 },
     };

     return (
       <section
         id="manifesto"
         ref={ref}
         className="bg-[#06071f] py-20 flex justify-center items-center"
       >
         <motion.div
           variants={variants}
           initial="hidden"
           animate={inView ? 'visible' : 'hidden'}
           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
         >
           <ManifestoVideo />
         </motion.div>
       </section>
     );
   }
   ```

2. **Video Component** (`ManifestoVideo.tsx`)

   ```tsx
   // src/components/home/ManifestoVideo.tsx
   'use client';
   export default function ManifestoVideo() {
     return (
       <video
         src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
         autoPlay
         loop
         muted
         playsInline
         className="max-w-full rounded-xl overflow-hidden"
         aria-label="Manifesto video presentation"
       />
     );
   }
   ```

## Non‑Negotiables

- **Performance**: Only `opacity` and `transform` are animated via Framer Motion.
- **Accessibility**: Respect `prefers-reduced-motion`. When reduced motion is preferred, the component renders the video statically (no animation).
- **No Layout‑Shift**: The container has a fixed height (`min-h-screen`) to avoid CLS.
- **Interactive Elements**: All interactive elements include descriptive `aria-label`s.

## Expected Outcome

- The Manifesto section reveals itself smoothly when scrolled into view.
- No scroll‑based expansion or shared animation with the Hero.
- The implementation follows the project's premium aesthetic and accessibility standards.
