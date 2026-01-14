## 2025-01-28 - Optimizing WebGL Animation Loops

**Learning:** When using `requestAnimationFrame` for continuous rendering (like WebGL scenes), always pair it with an `IntersectionObserver` to pause the loop when the component is off-screen. This saves significant GPU/CPU resources on long scrolling pages.
**Action:** Implement `isVisible` flag in animation loops toggled by `IntersectionObserver`. Crucially, reset `lastFrameTime` (or similar delta trackers) when visibility resumes to prevent "time jumps" causing physics glitches.
