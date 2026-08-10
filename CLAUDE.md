# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # dev server on :3000 (Turbopack is the default in Next 16)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config; `next lint` was removed in Next 16)
```

There is no test framework or typecheck script wired up. For type errors, run `npx tsc --noEmit`.

Note: both `package-lock.json` and `pnpm-lock.yaml` are committed. `package-lock.json` is the more recently updated one, so prefer `npm` unless told otherwise.

## Architecture

Single-page static marketing portfolio. There is no backend, no CMS, and no data fetching — `app/page.tsx` is a synchronous Server Component that renders the sections in order, and each section imports the content it needs directly. Everything below the page is a Client Component (they all animate).

### Content lives in two files

All copy is centralized, so changing text never means editing a component:

- **`lib/site.ts`** — identity and per-section prose. `siteConfig` (name, role, email, location, OG image) plus one export per section: `heroContent`, `aboutContent`, `experienceContent`, `servicesContent`, `portfolioContent`, `ctaContent`, `contactContent`, `footerContent`. Also owns `navLinks` and `socialLinks`.
- **`lib/data.ts`** — the repeating collections: `services`, `projects`, `experience`, `education`, `awards`, `skills`.

Both files are derived from `nirmalcv.md` at the repo root — the owner's actual CV. Job titles, dates, grades, project stacks, and award names are factual claims about a real person, so they trace back to that file rather than being invented. The CV also carries a phone number and street address that are deliberately *not* published here.

`app/layout.tsx` derives all its metadata from `siteConfig`, so the page title, OG tags, and Twitter card follow from the same source.

`CONTACT_EMAIL` in `lib/site.ts` is the real address the contact form opens a draft to — a wrong value silently loses messages.

Multi-line headlines (`heroContent.title`, `ctaContent.title`) embed `\n` and are split into `<br>`s at render time.

### Contact form

`sections/contact.tsx` validates with react-hook-form + zod, then hands off to the visitor's mail client by setting `window.location.href` to a `mailto:` with the subject and body pre-filled. Nothing is transmitted by the site itself. The success panel says the draft was opened, not that a message was sent, and repeats the address in case no mail client is configured — keep that distinction if you touch the copy.

### Directory roles

- `app/` — layout, the single page, global CSS. `layout.tsx` owns fonts (`Inter` → `--font-sans`, `Outfit` → `--font-heading`), metadata, and wraps everything in `ThemeProvider`.
- `sections/` — the homepage bands (hero, about, experience, services, portfolio, cta, contact). One per `<section id>`; nav links are hash links to those ids. Sections take no props.
- `components/` — shared chrome (navbar, footer, `section-heading`, `social-links`, `scroll-progress`) and animation primitives (`scroll-reveal`, `animated-text`, `animated-gradient`, `interactive-grid`).
- `components/ui/` — shadcn components. **Built on `@base-ui/react`, not Radix.** The style is `base-nova`; props are Base UI shapes (`SheetPrimitive.Popup.Props`), styling keys off `data-starting-style` / `data-ending-style`, and composition uses Base UI's `render` prop instead of `asChild`. Do not paste in Radix-era shadcn code.
- `hooks/` — `use-scroll` (past-threshold boolean) and `use-active-section` (IntersectionObserver scroll-spy powering the navbar's active link).
- `types/index.ts` — the shared content types.

### Styling

Tailwind v4, configured entirely in `app/globals.css` — there is no `tailwind.config`. The `@theme inline` block maps Tailwind color tokens to CSS variables defined under `:root` and `.dark`. Dark mode is a class variant (`@custom-variant dark (&:is(.dark *))`) driven by `next-themes`; default theme is `dark`.

Work through the semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `border-border`) so both themes follow, rather than hardcoding hex. Project-specific utilities also live in `globals.css`: `.glass-panel`, `.glass-panel-hover`, `.font-display`, `.bg-grid-pattern`, `.bg-dot-pattern`, `.sporty-glow`, `.button-neon`, and the `animate-float-*` / `animate-pulse-glow` keyframes.

### Conventions

- Reveal-on-scroll wraps content in `<ScrollReveal>` (`components/scroll-reveal.tsx`), which takes `direction` and `delay`. Prefer it over hand-rolling a `useInView`.
- Section intros use `<SectionHeading id title body />`, and the section element points `aria-labelledby` at that same id.
- **Reduced motion is handled in three places** and new animation should follow suit: `<MotionConfig reducedMotion="user">` in `theme-provider.tsx` covers framer-motion globally, a `@media (prefers-reduced-motion: reduce)` block in `globals.css` covers CSS keyframes and transitions, and components with looping or auto-advancing animation (`animated-text`, `interactive-grid`) check `useReducedMotion()` to skip the work entirely. Use `motion-safe:` for one-off animated utilities.
- Icons are looked up by lowercase string key through a local `iconMap` in the consuming component (`services.tsx`, `social-links.tsx`, `footer.tsx`). Adding an icon means extending those maps.
- Brand/social icons come from `components/brand-icons.tsx`, not lucide.
- Path alias is `@/*` → repo root, so `@/components/...`, `@/lib/...`, `@/types`.

`PROJECT_OVERVIEW.md` holds the design rationale and palette intent. Its file tree predates several files, so trust the repo over that document.
