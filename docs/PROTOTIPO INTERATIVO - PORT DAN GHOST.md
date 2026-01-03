#### Fullscreen Hold & Sound Logic (Desktop)

When the video reaches its fullscreen state (covers the entire viewport, scaleVideo = 1, borderRadius = 0):

1. Fullscreen Hold (2 seconds):
- The video remains in full-page fullscreen for 2 seconds.
- During these 2 seconds:
- The scroll is effectively held/locked on the Hero section (the page does not immediately move to the next section).
- The video stays centered and covers the full viewport.

2. Sound Behavior (Desktop):
- Before fullscreen:
- Video plays muted (thumbnail and transition states are always muted).
- When fullscreen state is reached:
- After reaching fullscreen, the video unmutes and audio plays while in this full-page state.
- After leaving fullscreen / going to the next section:
- When the user scrolls beyond the Hero section into the next section, the video is muted again.
- If the user scrolls back up into the Hero and hits fullscreen again, the same logic repeats:
- Muted during transition, unmute only in fullscreen, mute again when exiting.

Implementation Hint (State Machine):
- state = "thumbnail" | "transition" | "fullscreenHold" | "released"
- On scrollYProgress reaching 1.0:
- Enter fullscreenHold:
- Unmute video
- Start a 2-second timer before allowing scroll to continue normally.
- On scroll beyond Hero (next section in view):
- Mute video again and move to released.

⸻

#### Entrance Animation (on page load)

```js
initial: { 
  opacity: 0, 
  scale: 0.92, 
  translateY: 60, 
  filter: "blur(10px)" 
}
animate: { 
  opacity: 1, 
  scale: [1.02, 1],         // settle with a slight overshoot
  translateY: 0,
  filter: "blur(0px)"
}
duration: 1.2s
easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)


