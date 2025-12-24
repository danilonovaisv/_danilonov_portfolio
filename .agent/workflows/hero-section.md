---
description: hero
---

# Workflow: Hero Section Implementation (Ghost Atmosphere)

## Overview

- Implements the Hero section with a dark background, static text, and a Manifesto thumbnail.
- Uses a WebGL Ghost atmosphere rendered via `GhostStage`.
- All interactive elements have appropriate `aria-label`s and respect `prefers-reduced-motion`.

## Steps

1. **Create `HomeHero.tsx`**

   ```tsx
   // src/components/home/HomeHero.tsx
   import HeroCopy from "./HeroCopy";
   import ManifestoThumb from "./ManifestoThumb";
   import GhostStage from "./GhostStage";

   export default function HomeHero() {
     return (
       <section
         id="hero"
         className="relative w-full h-[100vh] md:h-[85vh] bg-[#06071f] overflow-hidden"
       >
         {/* WebGL Ghost atmosphere (z‑0) */}
         <GhostStage />

         {/* Radial overlay – decorative only (z‑10) */}
         <div
           className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,#0b0d3a_0%,#06071f_60%)] pointer-events-none"
           aria-hidden="true"
         />

         {/* Content (z‑20) */}
         <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4">
           <HeroCopy />
           <ManifestoThumb />
         </div>
       </section>
     );
   }
   ```

2. **Ghost WebGL (`Ghost.tsx`)** – floating animation only

   ```tsx
   // src/components/home/webgl/Ghost.tsx
   useFrame((state) => {
     const t = state.clock.getElapsedTime();
     const floatY =
       Math.sin(t * 1.6) * 0.03 +
       Math.cos(t * 0.7) * 0.018 +
       Math.sin(t * 2.3) * 0.008;
     ghostGroup.position.y = floatY;
     ghostMaterial.emissiveIntensity = 5.8 + Math.sin(t * 1.6) * 0.6;
   });
   ```

3. **Mouse follow (desktop only)**

   ```tsx
   // src/components/home/webgl/GhostCanvas.tsx
   function MouseFollower({ children }: { children: React.ReactNode }) {
     const { size } = useThree();
     const mouse = useRef({ x: 0, y: 0 });

     useEffect(() => {
       const handle = (e: MouseEvent) => {
         mouse.current.x = (e.clientX / size.width) * 2 - 1;
         mouse.current.y = -(e.clientY / size.height) * 2 + 1;
       };
       window.addEventListener("mousemove", handle);
       return () => window.removeEventListener("mousemove", handle);
     }, [size]);

     useFrame(() => {
       if (!ghostRef.current) return;
       const targetX = mouse.current.x * 8;
       const targetY = mouse.current.y * 5;
       ghostRef.current.position.x += (targetX - ghostRef.current.position.x) * 0.05;
       ghostRef.current.position.y += (targetY - ghostRef.current.position.y) * 0.05;
     });

     return <group ref={ghostRef}>{children}</group>;
   }
   ```

4. **Preloader (optional, respects reduced motion)**

   ```tsx
   // src/components/home/HeroPreloader.tsx
   export default function HeroPreloader() {
     return (
       <motion.div
         initial={{ opacity: 1 }}
         animate={{ opacity: 0 }}
         transition={{ delay: 1.5, duration: 1 }}
         className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]"
       >
         {/* SVG ghost loader omitted for brevity */}
         <div className="loading-text font-mono text-xs uppercase tracking-widest text-[#e0e0e0] mb-4">
           Summoning spirits
         </div>
         <div className="loading-progress w-24 h-0.5 bg-[#06071f] rounded-full overflow-hidden">
           <motion.div
             className="progress-bar h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]"
             initial={{ width: 0 }}
             animate={{ width: "100%" }}
             transition={{ duration: 2, ease: "easeInOut" }}
           />
         </div>
       </motion.div>
     );
   }
   ```

5. **Post‑processing (Analog Decay Pass – optional)**

   ```tsx
   // src/components/home/webgl/postprocessing/AnalogDecayPass.ts
   const AnalogDecayShader = shaderMaterial(
     {
       tDiffuse: new THREE.Texture(),
       uTime: 0,
       uIntensity: 0.7,
       uGrain: 0.4,
       uScanlines: 1.0,
       uJitter: 0.5,
     },
     `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
     `uniform sampler2D tDiffuse;uniform float uTime;uniform float uIntensity;uniform float uGrain;uniform float uScanlines;uniform float uJitter;varying vec2 vUv;float rand(vec2 co){return fract(sin(dot(co,vec2(12.9898,78.233)))*43758.5453);}void main(){vec2 uv=vUv;if(uJitter>0.01)uv+=(rand(vec2(uTime))-0.5)*uJitter*0.002;vec4 color=texture2D(tDiffuse,uv);if(uGrain>0.01){float grain=rand(uv+uTime)*2.0-1.0;color.rgb+=grain*uGrain*0.08*uIntensity;}if(uScanlines>0.01){float scan=sin(uv.y*1200.0+uTime*2.0)*0.5+0.5;color.rgb*=mix(1.0,0.97,scan*uScanlines*uIntensity);}gl_FragColor=color;}`
   );
   ```

## Non‑Negotiables

- Layering hierarchy must remain unchanged.
- No heavy scroll‑based animations; all motion is time‑based.
- Respect `prefers-reduced-motion`.
- All interactive elements have descriptive `aria-label`s.
- Background color `#06071f` with AA contrast for text.

## Expected Outcome

- Premium‑looking hero section with ethereal ghost effect.
- No console warnings or TypeScript errors.
- Smooth experience on desktop and mobile.
