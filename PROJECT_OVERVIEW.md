# Portfolio Project Overview

## Purpose
This repository is a personal developer portfolio built as a modern landing experience. The site is designed to present skills, work samples, services, testimonials, and contact information with a premium visual style inspired by sportswear and football kit aesthetics.

## Core Objectives
- Showcase the developer's brand in a polished portfolio format
- Deliver a strong visual identity using neon gradients and glassmorphism
- Provide smooth animated interactions and responsive layout
- Maintain strong SSR/CSR compatibility in Next.js
- Keep the content structure modular and easy to update

## Technology Stack
- `Next.js` 16 with App Router
- `React` 19
- `TypeScript`
- `Tailwind CSS` v4
- `shadcn/ui` for component styling and UI primitives
- `framer-motion` for animated transitions and reveal effects
- `next-themes` for theme switching
- `lucide-react` for iconography
- `react-hook-form` + `zod` for contact form validation
- `embla-carousel-react` for carousel behavior
- `tw-animate-css` for additional animation utilities
- `class-variance-authority` for button variant management

## Design Direction
The current theme is a **sporty neon aesthetic** inspired by a **Spain away football kit**:
- Cream white base: `#F7F3E8`
- Neon yellow accent: softened to `#D9EA35`
- Bright red action color: `#FF3B30`
- Deep navy details: `#0F172A`
- Soft gray support: `#D9D9D9`

Visual goals:
- energetic, futuristic, premium, and minimal
- smooth yellow-to-red glow gradients
- glassmorphism cards with soft borders and blurs
- neon buttons with red hover states
- navy contrast and cream backgrounds
- Gen Z / UEFA-inspired styling

## Repository Structure
```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  navbar.tsx
  footer.tsx
  theme-toggle.tsx
  animated-gradient.tsx
  interactive-grid.tsx
  ui/               # reusable shadcn-style UI wrappers
sections/
  hero.tsx
  about.tsx
  services.tsx
  portfolio.tsx
  testimonials.tsx
  cta.tsx
  contact.tsx
lib/
  data.ts
hooks/
  use-scroll.ts
package.json
README.md
PROJECT_OVERVIEW.md
```

## Important Files
### `app/layout.tsx`
- Root layout with Google font loading via `next/font`
- Wraps the app in `ThemeProvider` from `next-themes`
- Applies global HTML/body classes and layout metadata

### `app/page.tsx`
- Composes the homepage from section components
- Uses a simple static page layout for portfolio presentation

### `app/globals.css`
- Defines the theme palette and CSS variables
- Implements glassmorphism, glow helpers, custom scrollbar, and animation utilities
- Central place for dark/light mode styling and design tokens

### `components/navbar.tsx`
- Sticky header with desktop navigation and mobile sheet menu
- Includes theme toggle and CTA button/link
- Uses `use-scroll` for header background behavior on scroll

### `components/theme-toggle.tsx`
- Client-only component for switching between light and dark mode
- Uses a mount effect to avoid hydration mismatch with `next-themes`
- Animates icon changes with Framer Motion

### `components/animated-gradient.tsx`
- Renders blurred gradient background glows
- Used in hero and section backgrounds for premium depth

### `sections/*`
- Modular homepage sections for hero, about, services, portfolio, testimonials, CTA, and contact
- Each section uses glass panels, gradients, and responsive layout

### `lib/data.ts`
- Static content definitions for nav links, projects, skills, testimonials, and services
- Keeps site content separated from component logic

## Current Issues and Fixes
- A hydration mismatch was identified and fixed by ensuring client-only theme state is mounted in `useEffect`.
- Invalid HTML nesting was removed where `<Button>` components were wrapped directly inside Next.js `<Link>` anchors.
- Dark mode glass box contrast was improved by switching `.glass-panel` to use the theme-aware card background instead of `bg-white/75`.
- Neon yellow was softened in the palette for better overall legibility.

## Development Commands
- `npm run dev` — start the local dev server
- `npm run build` — build for production
- `npm run start` — start the built app
- `npm run lint` — run ESLint validation

## Design and UX Notes
- The site blends modern portfolio content with sports branding cues
- CTA buttons and section highlights use red/yellow gradients for energy
- Glass panels and soft blur create a premium layered feel
- The navbar and mobile menu are designed to be lightweight and accessible

## Next Improvements
Potential next steps include:
- refining mobile responsiveness and spacing across breakpoints
- adding deeper brand animation and kit-style pattern overlays
- optimizing images and portfolio project previews
- adding analytics or tracking for portfolio engagement

---

This file is intended to provide a standalone, in-depth summary of the current portfolio project and its implementation details.