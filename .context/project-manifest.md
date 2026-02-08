# Project Manifest

## Identity

- **Project Name**: Danilo Novais Portfolio
- **Type**: High-End Creative Portfolio (Awwwards Aim)
- **Role**: Senior Creative Technologist Agent

## Tech Stack (Locked)

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.18
  - Plugins: `tailwindcss-animate`, `@tailwindcss/typography`
- **WebGL Engine**:
  - `three`: 0.182.0
  - `@react-three/fiber`: 9.5.0
  - `@react-three/drei`: 10.7.7
  - `@react-three/postprocessing`: 3.0.4
- **Animation**:
  - `gsap`: 3.14.2
  - `framer-motion`: 12.33.0
  - `lenis`: 1.3.17 (Smooth Scroll)
- **Backend/Services**:
  - Firebase (Hosting/Functions)
  - Supabase (Database/Storage/Realtime)

## Folder Structure (Key Paths)

- `.context/`: Source of Truth & Memory
- `docs/plans/`: Feature Implementation Plans
- `src/app/`: Next.js App Router Pages
- `src/components/canvas/`: R3F/WebGL Components (Meshes, Shaders)
- `src/components/dom/`: React UI Components
- `src/config/`: Constants & Configuration
- `public/assets/`: 3D Models (Draco Compressed) & Textures

## Build & Deploy

- **Build Command**: `pnpm build`
- **Package Manager**: `pnpm`
- **Output**: Standalone (Next.js) -> Firebase Hosting
