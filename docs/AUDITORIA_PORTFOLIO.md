 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

 # Visual Fidelity Analysis Report: portfoliodanilo.com

## 1️⃣ Global Overview

The implementation shows strong adherence to the reference images in basic structure and color scheme, but contains critical deviations in layout structure, typography hierarchy, and responsive behavior. Most significant issues are found in the Portfolio Showcase, Featured Projects, and About page sections where the implementation diverges from the reference images in fundamental structural aspects. The mobile responsiveness appears particularly problematic as several sections fail to maintain proportional typography and correct layout patterns as specified in the reference images.

## 2️⃣ Section-by-Section Analysis

## 🎯 Section: Header

- Reference images: Desktop / Mobile
- Layout fidelity: ✓
- Typography fidelity (section-level): ✓
- Proportional responsiveness: ✓
- Positioning logic (mobile): ✓

### ❌ Detected Deviations
- None detected. The header implementation matches reference images and specifications.

## 🎯 Section: Hero

- Reference images: Desktop / Mobile
- Layout fidelity: ✗
- Typography fidelity (section-level): ✓
- Proportional responsiveness: ✓
- Positioning logic (mobile): ✓

### ❌ Detected Deviations
- **Missing Manifesto Video Thumbnail**: The technical specification states "Manifesto Video Thumbnail(floating, bottom-right)" but the implementation shows the video as a full-width background rather than a floating thumbnail that expands on scroll.
- **WebGL Atmosphere Missing**: The specification details a "Ghost Atmosphere(WebGL Canvas)" with "Ethereal, organic 3D atmosphere" but the implementation uses a static ghost icon without the dynamic elements described.

### 🔧 Required Adjustments
- Implement the floating video thumbnail as specified in the technical documentation (section 4.2)
- Add the WebGL canvas for the ghost atmosphere with the specified properties (section 4.2)
- Ensure the video thumbnail follows the scroll behavior: "The video stays fixed to viewport during scroll" and "Scales up toward fullscreen as user scrolls"

### ✅ Expected Result
The hero section should display a floating video thumbnail in the bottom-right corner that expands to fullscreen as the user scrolls, with the WebGL ghost atmosphere visible as a background layer. The video should remain muted during the transition and only unmute when fully expanded.

## 🎯 Section: Portfolio Showcase

- Reference images: Desktop / Mobile
- Layout fidelity: ✗
- Typography fidelity (section-level): ✗
- Proportional responsiveness: ✗
- Positioning logic (mobile): ✗

### ❌ Detected Deviations
- **Missing Floating Label**: The reference images show "[what we love working on]" as a floating label, but this is absent in the implementation.
- **Incorrect Category Alignment**: The specification states "three interactive stripes(accordion-style rows), each with alternating alignment" (right, center, left), but the implementation shows all categories aligned left.
- **Missing Thumbnail Reveal**: The specification describes "thumbnail(hidden by default, reveals on hover)" but this behavior is not implemented.
- **Mobile Layout Inconsistency**: The mobile reference shows full-width cards stacked vertically, but the implementation doesn't properly adapt the layout.

### 🔧 Required Adjustments
- Add the floating label "[what we love working on]" positioned absolute as specified
- Implement the alternating alignment pattern (right, center, left) for category stripes
- Add the thumbnail reveal animation on hover as described in the specification
- Ensure mobile layout properly stacks categories as full-width cards with center alignment

### ✅ Expected Result
The Portfolio Showcase section should display a floating label above the categories, with each category stripe having alternating alignment (right, center, left). On hover, each stripe should reveal a thumbnail with the specified animation. On mobile, categories should appear as full-width cards stacked vertically with center alignment.

## 🎯 Section: Featured Projects

- Reference images: Desktop / Mobile
- Layout fidelity: ✗
- Typography fidelity (section-level): ✗
- Proportional responsiveness: ✗
- Positioning logic (mobile): ✗

### ❌ Detected Deviations
- **Incorrect Grid Layout**: The specification describes an irregular Bento Grid pattern with specific column spans, but the implementation uses a more regular grid structure.
- **Missing Tags/Pills**: The specification states "Pills(tags) positioned absolute, top-right" but these are absent in the implementation.
- **CTA Card Placement**: The CTA card should be in the bottom-right position (md:col-span-4), but the implementation places it differently.
- **Mobile Layout Issues**: The mobile reference shows a vertical stack of cards, but the implementation doesn't properly adapt the layout.

### 🔧 Required Adjustments
- Implement the exact Bento Grid structure as specified: Row 1 (5/7 columns), Row 2 (12 columns), Row 3 (8/4 columns)
- Add the tags/pills to each project card as specified
- Position the CTA card in the correct location (bottom-right)
- Ensure mobile layout properly stacks cards vertically with appropriate spacing

### ✅ Expected Result
The Featured Projects section should display an irregular grid matching the reference image, with tags/pills visible on each card. The CTA card should appear in the bottom-right position. On mobile, all cards should stack vertically with consistent spacing.

## 🎯 Section: Client Logos

- Reference images: Desktop / Mobile
- Layout fidelity: ✗
- Typography fidelity (section-level): ✓
- Proportional responsiveness: ✗
- Positioning logic (mobile): ✗

### ❌ Detected Deviations
- **Inconsistent Logo Spacing**: The reference images show consistent spacing between logos, but the implementation has uneven spacing.
- **Missing Logo Inversion**: The specification states "Logos: White (apply filter: brightness(0) invert)" but some logos appear to have different styling.
- **Mobile Layout Issues**: The mobile reference shows a 2-3 column grid, but the implementation doesn't properly adapt.

### 🔧 Required Adjustments
- Standardize logo spacing to match the reference images
- Apply consistent styling with `filter: brightness(0) invert` to all logos
- Implement the correct responsive grid behavior (3-4 columns on mobile, 6+ on desktop)

### ✅ Expected Result
The Client Logos section should display a consistent grid with even spacing between logos. All logos should have the same white styling with proper inversion. The grid should adapt correctly across breakpoints.

## 🎯 Section: About Page

- Reference images: Desktop / Mobile
- Layout fidelity: ✗
- Typography fidelity (section-level): ✗
- Proportional responsiveness: ✗
- Positioning logic (mobile): ✗

### ❌ Detected Deviations
- **ORIGEM Section Layout**: The specification states "alternating text ↔ mídia" but the implementation shows a different layout structure.
- **Capability Cards Layout**: The "Do insight ao impacto" section should have 7 cards in a grid (2-3 columns), but the implementation shows a vertical list.
- **Process Steps Formatting**: The "Criatividade com método" section should have numbered steps with specific layout, but the implementation shows a different format.
- **Missing Rotating Phrases**: The "Acredito no design que muda o dia" section should have rotating phrases, but the implementation shows static text.
- **Mobile Layout Issues**: The mobile reference shows a single column with text before images, but the implementation doesn't follow this pattern.

### 🔧 Required Adjustments
- Implement the alternating text/image layout for the ORIGEM section as specified
- Create the 7 capability cards in a proper grid layout (2-3 columns desktop)
- Format the process steps with correct numbering and layout
- Add the rotating phrases animation for the "Acredito no design" section
- Ensure mobile layout follows the "text always comes before image" pattern

### ✅ Expected Result
The About page should display the ORIGEM section with alternating text and media blocks, capability cards in a proper grid, numbered process steps, and rotating phrases in the designated section. On mobile, all content should stack in a single column with text preceding images.

## 3️⃣ Atomic Execution Prompts

### 🛠️ Prompt #01 — Portfolio Showcase Floating Label

**Objective**
Add the floating label "[what we love working on]" to the Portfolio Showcase section.

**Files / Components**
- `components/home/PortfolioShowcase.tsx`

**Actions**
1. Add a new div element with the text "[what we love working on]"
2. Position it absolute with top: -24px and left: 0
3. Style it with color: #4fe6ff, font-size: 14px, and appropriate tracking
4. Ensure it's visible only on desktop (lg+ breakpoints)

**Rules**
- Images are the final truth
- Do not alter copy
- Section-based typography only

**Acceptance Criteria**
- [ ] Floating label appears above the category stripes
- [ ] Label is positioned absolute as shown in reference images
- [ ] Label uses correct color (#4fe6ff) and styling

### 🛠️ Prompt #02 — Portfolio Showcase Alternating Alignment

**Objective**
Implement alternating text alignment for category stripes (right, center, left).

**Files / Components**
- `components/home/PortfolioShowcase.tsx`

**Actions**
1. Add conditional classes to each category stripe:
   - First stripe: text-right (for "Brand & Campaigns")
   - Second stripe: text-center (for "Videos & Motions")
   - Third stripe: text-left (for "Web Campaigns, Websites & Tech")
2. Ensure proper spacing and positioning for each alignment
3. Add responsive adjustments for mobile (all center-aligned)

**Rules**
- Images are the final truth
- Do not alter copy
- Section-based typography only

**Acceptance Criteria**
- [ ] Category stripes display with correct alternating alignment
- [ ] Mobile layout shows all categories center-aligned
- [ ] Spacing remains consistent across alignments

### 🛠️ Prompt #03 — Featured Projects Bento Grid

**Objective**
Implement the exact Bento Grid structure for featured projects.

**Files / Components**
- `components/home/FeaturedProjects.tsx`

**Actions**
1. Restructure the grid using Tailwind column spans:
   - Row 1: Two cards (md:col-span-5 and md:col-span-7)
   - Row 2: One full-width card (md:col-span-12)
   - Row 3: One card (md:col-span-8) and CTA card (md:col-span-4)
2. Add the tags/pills to each project card
3. Position the CTA card in the bottom-right position

**Rules**
- Images are the final truth
- Do not alter copy
- Section-based typography only

**Acceptance Criteria**
- [ ] Grid matches the reference image's irregular pattern
- [ ] Tags/pills appear in top-right of each project card
- [ ] CTA card is positioned correctly in bottom-right

### 🛠️ Prompt #04 — About Page ORIGEM Section Layout

**Objective**
Implement the alternating text/image layout for the ORIGEM section.

**Files / Components**
- `components/sobre/OrigemSection.tsx`

**Actions**
1. Restructure the ORIGEM section to use alternating layout:
   - Block A: Text (cols 2-6), Video (cols 8-12)
   - Block B: Video (cols 2-6), Text (cols 8-12)
   - Block C: Text (cols 2-6), Image (cols 8-12)
   - Block D: Video (cols 2-6), Text (cols 8-12)
2. Add proper spacing between blocks (24-32px vertical)
3. Implement mobile layout as single column with text before image

**Rules**
- Images are the final truth
- Do not alter copy
- Section-based typography only

**Acceptance Criteria**
- [ ] Desktop layout shows alternating text/image blocks
- [ ] Mobile layout shows single column with text before image
- [ ] Spacing matches reference images

### 🛠️ Prompt #05 — About Page Capability Cards Grid

**Objective**
Implement the 7 capability cards in a proper grid layout.

**Files / Components**
- `components/sobre/CapabilitiesSection.tsx`

**Actions**
1. Create a grid container with:
   - lg(≥1024px): 2 columns
   - xl(≥1280px): 3 columns
2. Add 7 cards with consistent styling
3. Implement the animated marquee footer as specified
4. Ensure proper spacing between cards (20-24px)

**Rules**
- Images are the final truth
- Do not alter copy
- Section-based typography only

**Acceptance Criteria**
- [ ] Cards display in 2-3 column grid on desktop
- [ ] Mobile layout shows single column
- [ ] Animated marquee appears below the grid
- [ ] Spacing matches reference images

### 🛠️ Prompt #06 — About Page Rotating Phrases

**Objective**
Implement the rotating phrases animation for the "Acredito no design" section.

**Files / Components**
- `components/sobre/PhilosophySection.tsx`

**Actions**
1. Create a container for rotating phrases with min-height: 40vh
2. Implement the sequence:
   - Title fixed at top (visible throughout)
   - Phrases rotating one at a time
   - Ghost+manifesto reveal after all phrases
3. Add proper animation timing (4.2s per phrase)
4. Implement mobile-specific layout (single column)

**Rules**
- Images are the final truth
- Do not alter copy
- Section-based typography only

**Acceptance Criteria**
- [ ] Phrases rotate with correct timing
- [ ] Title remains fixed during rotation
- [ ] Ghost and manifesto appear after all phrases
- [ ] Mobile layout follows reference images

### 🛠️ Prompt #07 — Client Logos Grid Consistency

**Objective**
Standardize logo spacing and styling across all breakpoints.

**Files / Components**
- `components/home/ClientsSection.tsx`

**Actions**
1. Apply consistent grid spacing (24px) between all logos
2. Ensure all logos use the same styling: `filter: brightness(0) invert`
3. Implement responsive grid:
   - Mobile: 2-3 columns
   - Desktop: 6+ columns
4. Add proper vertical spacing between logo rows

**Rules**
- Images are the final truth
- Do not alter copy
- Section-based typography only

**Acceptance Criteria**
- [ ] Logos have consistent spacing across all breakpoints
- [ ] All logos use the same white styling with proper inversion
- [ ] Grid adapts correctly to different screen sizes
- [ ] Mobile layout matches reference images
