---
name: Ether Noir
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c9c6c5'
  primary: '#c9c6c5'
  on-primary: '#313030'
  primary-container: '#050505'
  on-primary-container: '#797777'
  inverse-primary: '#5f5e5e'
  secondary: '#e9c349'
  on-secondary: '#3c2f00'
  secondary-container: '#af8d11'
  on-secondary-container: '#342800'
  tertiary: '#c6c6c7'
  on-tertiary: '#2f3131'
  tertiary-container: '#040505'
  on-tertiary-container: '#767778'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Bodoni Moda
    fontSize: 80px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Bodoni Moda
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Bodoni Moda
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '300'
    lineHeight: '1.6'
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.15em
spacing:
  container-max: 1440px
  gutter: 2rem
  margin-edge: 4rem
  section-gap: 10rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
---

## Brand & Style

This design system embodies the "Whisper, don't shout" philosophy of an ultra-luxury UK fragrance house. The brand personality is cinematic, intimate, and profoundly understated, targeting a discerning audience that values silence and craftsmanship over loud branding.

The visual style is a blend of **Minimalism** and **High-Contrast Editorial**, inspired by luxury film aesthetics. It utilizes expansive negative space to create a sense of "air" and exclusivity. Visual interest is driven by atmospheric textures—such as subtle film grain overlays and high-fashion photography—rather than traditional product grids. The interface should feel like a private gallery: quiet, intentional, and evocative.

## Colors

The palette is strictly controlled to maintain a cinematic depth. 

- **Jet Black (#050505):** The primary canvas. Used for backgrounds to create an "infinite" depth that allows imagery and typography to glow.
- **Antique Gold (#D4AF37):** Used exclusively for highlights, subtle accents, and interactive states. It represents the "essence" within the dark.
- **Pure White (#FFFFFF):** Reserved for primary typography and high-priority information, providing a crisp contrast against the dark base.
- **Surface Neutrals:** Deep greys are used for borders and secondary containers to maintain hierarchy without breaking the immersion of the black background.

## Typography

The typography strategy mirrors a luxury editorial. 

**Bodoni Moda** serves as the display typeface. Its high contrast between thick and thin strokes provides a classical, sophisticated elegance. It should be used with generous leading and tight letter-spacing for large headlines to emphasize the cinematic quality.

**DM Sans** provides a clean, understated counterpoint for body copy. It is set with a light weight and increased line height to ensure readability while maintaining a "whispered" tone. Labels and navigation items utilize wide letter-spacing and uppercase styling to evoke high-end fashion labeling.

## Layout & Spacing

The layout utilizes a **Fixed Grid** system to maintain precise editorial control over composition. 

- **Desktop:** A 12-column grid with wide 4rem margins. Sections are separated by massive vertical gaps (10rem+) to force the user to slow down and focus on one element at a time.
- **Mobile:** A 4-column grid with 1.5rem margins. Layouts should reflow vertically, prioritizing large-scale imagery that bleeds to the edges.
- **Composition:** Asymmetric layouts are encouraged. Text should often be offset from the center or tucked into corners to create a "found-object" feel within the negative space.

## Elevation & Depth

This design system avoids traditional shadows in favor of **Tonal Layers** and **Atmospheric Depth**.

1.  **Base Layer:** The deepest black (#050505), often with a 2-3% noise texture overlay to simulate film grain.
2.  **Interactive Surfaces:** Semi-transparent containers (10-15% opacity white) create a "glass" effect that subtly lifts content without hard edges.
3.  **Light as Depth:** Rather than shadows, use radial gradients of very low-opacity Antique Gold to "illuminate" active areas or focal points.
4.  **The Signature Mark:** The "Two Souls / One Essence" mark should be used as a structural anchor, often placed at the intersection of containers or as a watermark in the background.

## Shapes

To maintain the architectural and "high-fashion" aesthetic, this design system uses **Sharp (0px)** corners for all structural elements including buttons, inputs, and image containers. 

The only circular elements permitted are the brand's signature mark and specific functional icons. This contrast between the rigid, sharp grid and the organic, circular brand mark reinforces the "Two Souls / One Essence" narrative.

## Components

### Buttons
Primary actions are represented by "Ghost" buttons: Antique Gold 1px borders with Sharp corners and centered, tracked-out uppercase text. Hover states involve a subtle inner glow or a fill transition to Gold with Black text.

### Inputs
Input fields are single lines (Pure White, 0.5px thickness) with labels positioned above in a small, tracked-out font. Focus states change the line color to Antique Gold.

### Cards
Cards do not have visible borders or backgrounds by default. They are defined by the imagery they contain. Text is placed below the image with significant padding. On hover, a subtle film-grain texture or a slight zoom-in on the image provides the feedback.

### The "Two Souls" Loader
A custom loading animation featuring the two-circle mark slowly overlapping and separating, rendered in a soft-glow Antique Gold.

### Lists
Lists should be separated by thin, low-opacity horizontal lines. Each item should have a generous height to prevent a crowded feeling, maintaining the "whisper" aesthetic.