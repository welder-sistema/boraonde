---
name: Luminous Gastronomy
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#c3c0ff'
  on-secondary: '#1d00a5'
  secondary-container: '#3626ce'
  on-secondary-container: '#b3b1ff'
  tertiary: '#bec6e0'
  on-tertiary: '#283044'
  tertiary-container: '#9ba2bb'
  on-tertiary-container: '#31394d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3323cc'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 80px
---

# BoraOnde
**A Inteligência Artificial que decide seu rolê.**

## Brand & Style
The design system for this restaurant recommendation platform is built on a "Neon-Noir" aesthetic—a blend of **Modern Corporate** structure with **Glassmorphism** and **High-Contrast** interactive accents. The goal is to evoke a sense of late-night premium dining, sophisticated exploration, and technological precision.

The UI targets food enthusiasts and urban explorers who value curation and a premium digital experience. By utilizing deep slate foundations contrasted with vibrant emerald and indigo glows, the interface feels like a high-end concierge service. The emotional response should be one of excitement, reliability, and modern luxury.

## Colors
This design system utilizes a deep, immersive dark mode palette to emphasize content and photography.

- **Primary (Emerald-500):** Used for primary success states, active progress indicators, and "Best Match" highlights.
- **Secondary (Indigo-600):** Used for primary call-to-action buttons and interactive navigational elements.
- **Neutral (Slate):** The background is strictly anchored in Slate-900 (#0f172a), with Slate-800 used for card surfaces and Slate-400 for secondary text.
- **Accents:** Functional use of emerald-toned glows (20% opacity) to signify high-rated recommendations.

## Typography
The typographic scale emphasizes clarity and modernism. **Hanken Grotesk** provides a sharp, contemporary feel for headings, while **Inter** ensures maximum readability for restaurant descriptions and reviews. **JetBrains Mono** is introduced sparingly for metadata (e.g., price ranges, distances, and timestamps) to lean into the precise, "data-driven" SaaS aspect of the product.

## Layout & Spacing
This design system employs a **Fluid Grid** model based on an 8px square system. 

- **Desktop:** 12-column grid with 24px gutters. Content is centered with generous 80px side margins to maintain a premium, editorial feel.
- **Tablet:** 8-column grid with 16px gutters.
- **Mobile:** 4-column grid with 16px margins. 

Vertical rhythm is strictly maintained using the `md` (24px) spacing unit for component grouping and `lg` (40px) for section headers.

## Elevation & Depth
Depth is achieved through **Tonal Layering** and **Subtle Glows** rather than traditional heavy shadows.

- **Level 0 (Base):** Slate-900.
- **Level 1 (Cards/Surfaces):** Slate-800 with a subtle 1px border of Slate-700.
- **Level 2 (Popovers/Modals):** Slate-800 with a 15% Indigo-600 outer glow (blur: 20px) to simulate light emission.
- **Glassmorphism:** Navigation bars and sticky headers use a backdrop-filter (blur: 12px) with a 60% opaque Slate-900 background.

## Shapes
The shape language is ultra-modern and friendly, utilizing the `rounded-2xl` (1rem / 16px) standard for all primary containers and restaurant cards. 

- **Buttons:** Fully pill-shaped (rounded-full) to contrast against the structured grid.
- **Input Fields:** Use a 12px (rounded-xl) radius.
- **Images:** All restaurant photography must utilize a 16px corner radius to match the card containers.

## Components

### Buttons & Interaction
- **Primary Action:** Indigo-600 background with a subtle indigo drop-glow. On hover, the glow intensity increases.
- **Secondary Action:** Ghost style with a Slate-700 border and Emerald-500 text.
- **Glowing Buttons:** For "Featured" restaurants, use a primary Emerald-500 button with an animated 4px outer pulse.

### Form Elements & Sliders
- **Range Sliders:** The track is Slate-700. The active fill is a gradient from Indigo-600 to Emerald-500. The thumb (handle) is a large, white 24px circle with a heavy Emerald-500 shadow.
- **Input Fields:** Slate-800 background, 1px Slate-700 border. Focus state triggers a 1px Emerald-500 border and a soft emerald inner-glow.

### Feedback & Indicators
- **Progress Indicators:** Linear bars for "Taste Match" percentages. Background is Slate-700, fill is Emerald-500 with a 4px blur glow effect on the leading edge.
- **Chips:** Small, Slate-800 surfaces with 12px radius. Active chips use an Indigo-600 border and text.

### Cards
- **Restaurant Cards:** Feature a high-resolution image top, Slate-800 body below. Title in Hanken Grotesk, Meta-data in JetBrains Mono.