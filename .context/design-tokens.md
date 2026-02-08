# Design Tokens

## Colors (Source: src/app/globals.css)

### Brand Core

- **Primary Blue**: `#0048ff` (`--color-bluePrimary`)
- **Accent Blue**: `#4fe6ff` (`--color-blueAccent`)
- **Background**: `#040013` (`--color-background`) - Deep Dark Blue/Black
- **Text Main**: `#fcffff` (`--color-text`)
- **Nestlé Red (Accent)**: `#E50914` (From AGENT.md Override)

### Secondary / Details

- **Purple**: `#8705f2`
- **Pink**: `#f501d3`
- **Neutral Dark**: `#0b0d3a`
- **Text Secondary**: `#a1a3a3`

## Typography

### Families

- **Sans (UI/Body)**: 'TT Norms Pro', system-ui
- **Display**: 'Outfit', sans-serif (also used for Headings)
- **Mono**: 'PPSupplyMono', monospace

### Scale (Fluid Clamp)

- **Display**: `clamp(2.5rem, 5vw, 4.5rem)`
- **H1**: `clamp(2rem, 4vw, 3.5rem)`
- **H2**: `clamp(1.5rem, 3vw, 2.5rem)`
- **Body**: `clamp(1rem, 1.2vw, 1.125rem)`

## Animation Curves (Standard)

- **Ease Out Quad**: `power2.out` (GSAP)
- **Smooth**: `[0.25, 0.1, 0.25, 1.0]` (Bezier)

## Spacing

- **Container**: `clamp(24px, 5vw, 96px)`
- **Card Height (Desktop)**: `480px`
