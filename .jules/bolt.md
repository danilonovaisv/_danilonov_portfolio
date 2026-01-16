## 2024-05-23 - Consolidating Post-Processing Passes

**Learning:** `EffectComposer` in `@react-three/postprocessing` executes each effect as a separate render pass (unless merged by the library, which custom effects are not). Stacking separate `Noise`, `Vignette`, and a custom `AnalogDecay` (which internally calculated grain and vignette) resulted in 4+ full-screen shader passes per frame.
**Action:** Always inspect custom shader effects to see if they can handle standard effects like grain or vignette internally. Consolidating these into a single custom shader pass significantly reduces GPU overhead, especially for full-screen effects.

## 2026-01-04 - Invalid next/image usage for Videos
**Learning:** The codebase was attempting to render `.mp4` files using `next/image` component. This causes browser errors (loading video as image) and potential server-side optimization failures. `next/image` is strictly for images.
**Action:** Always verify asset types before using `next/image`. Use `<video>` tag for video assets with appropriate lazy-loading strategies (IntersectionObserver or onViewportEnter).
