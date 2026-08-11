# Research: Contact Page Audit & Improvements

**Feature Branch**: `008-contact-page-redesign`

## Research Items & Decisions

### 1. Custom PNG Icon Support in FeatureGrid Component

- **Context**: The user added `email-icon.png` and `whatsapp-icon.png` to `public/img/`. Currently `FeatureGrid.astro` accepts an `icon` string rendered via `set:html`.
- **Decision**: Update `src/content/config.ts` schema for `featureGridBlock` to support an optional `icon_image: z.string().optional()` property on grid cards. In `FeatureGrid.astro`, if `icon_image` is present, render a responsive `<img>` element with proper width, height, object-fit, and lazy loading; otherwise fallback to `icon` string/emoji.
- **Rationale**: Keeps content markdown files clean and declarative (`icon_image: "/img/email-icon.png"`), preserves strict typing, and allows proper styling (sizing, hover effects, dark/light contrast) in CSS.
- **Alternatives Considered**:
  - *Raw HTML in `icon` field*: Passing `<img src="/img/email-icon.png" />` inside the `icon` string field works with `set:html`, but violates content separation principles and prevents Astro image/responsive optimization.

### 2. Copy-to-Clipboard & Mailto Fallback Action

- **Context**: `mailto:` links fail on devices where no native email client is configured.
- **Decision**: Create a Lit web component or interactive Astro action button (`<copy-to-clipboard>` or extended `Button.astro` with `copy_text`) that copies `astrologyforthefuture@gmail.com` to the user's clipboard and displays a 2-second "Copied!" notification badge.
- **Rationale**: Aligns with Principle I (Lit Web Components for dynamic client interaction) and ensures zero user drop-off on desktop browsers without default email protocols set.

### 3. Contact Page Structure & Content Layout Optimization

- **Context**: The existing contact page has 4 sections (`hero`, `feature-grid`, `feature-card` for Online Sessions, `feature-card` for Gift Card).
- **Decision**:
  1. **Hero**: Update copy in EN/ES to feature Dr. Glenda Ferreira M.D., highlighting personalized astrology consultations.
  2. **Feature Grid (Contact Channels)**:
     - Card 1: **Email Us** (`/img/email-icon.png`) -> `astrologyforthefuture@gmail.com` + Copy Email action button.
     - Card 2: **WhatsApp Direct** (`/img/whatsapp-icon.png`) -> `wa.me/573054315796` with pre-filled localized message.
     - Card 3: **Worldwide Sessions** (Globe icon) -> Details on Zoom online readings & recording provided.
  3. **Split Content / Feature Cards**: Restructure Online Sessions & Gift Cards into distinct, visually engaging sections with clear list items and CTAs.
- **Rationale**: Creates a cohesive, high-converting journey from intro -> immediate contact options -> session logistics -> gift options.
