# Feature Specification: Contact Page Audit & Structure Redesign

**Feature Branch**: `008-contact-page-redesign`

**Created**: 2026-08-10

**Status**: Draft

**Input**: User description: "The current page structure of the contact page needs love. Let's audit it and propose improvements"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Multi-Channel Contact & Booking Options (Priority: P1)

As a site visitor looking to book an astrology reading or ask a question, I want clear, visually distinct contact options (Email, WhatsApp, and Online Session details) using high-quality brand icons instead of plain text emojis, so that I can easily choose my preferred way to reach Dr. Glenda Ferreira.

**Why this priority**: Directly impacts user conversion and consultation inquiries by making contact channels instantly recognizable and accessible.

**Independent Test**: Visit `/contact` (EN) and `/es/contact` (ES).
- Verify the Email card displays `public/img/email-icon.png` and direct email link/button.
- Verify the WhatsApp card displays `public/img/whatsapp-icon.png` and pre-populated WhatsApp chat link (`wa.me`).
- Verify cards render responsively with clean spacing, hover effects, and modern styling.

**Acceptance Scenarios**:
1. **Given** a visitor loading `/contact` or `/es/contact`, **When** viewing the contact channels grid, **Then** crisp PNG icons (`email-icon.png`, `whatsapp-icon.png`) are rendered in place of text emojis.
2. **Given** a mobile or desktop visitor clicking "Message Me" / "Mensaje", **When** selected, **Then** WhatsApp opens with a pre-filled translated greeting message requesting consultation details.

---

### User Story 2 - Clear Session & Gift Card Information Hierarchy (Priority: P2)

As a prospective client, I want structured sections detailing Online Zoom Sessions (recording included, worldwide access) and Gift Cards so I understand what to expect before booking.

**Why this priority**: Eliminates friction and answered FAQs prior to contact, establishing trust and clarity.

**Independent Test**: Scroll through `/contact` and `/es/contact`.
- Verify the Online Sessions section highlights key features (Zoom, recorded for later viewing, flexible time zones).
- Verify the Gift Card section displays cleanly with image and details in both English and Spanish.

**Acceptance Scenarios**:
1. **Given** a visitor interested in session logistics, **When** reviewing the Online Sessions block, **Then** key benefits (Zoom, recording included, global access) are presented in a structured list.
2. **Given** a visitor seeking a gift reading, **When** reviewing the Gift Card section, **Then** the image and purchase instructions render seamlessly across desktop and mobile screens.

---

### User Story 3 - Interactive Copy-to-Clipboard & Fallback Contact Actions (Priority: P2)

As a visitor whose browser or device does not have a default email client set up, I want a "Copy Email" button and feedback indicator, so that I can copy `astrologyforthefuture@gmail.com` with one click without opening a broken `mailto:` link.

**Why this priority**: Fallback for `mailto:` links ensures 100% of visitors can grab contact details regardless of OS/device configuration.

**Independent Test**: Click "Copy Email" or mail interaction on `/contact`.
- Verify email address is copied to clipboard and a visual success toast/tooltip appears.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: FeatureGrid component MUST support both text/HTML icons and image icon paths (`icon_image`) with proper alt text and dimensions.
- **FR-002**: Contact page content (`src/content/pages/en/contact.md` & `src/content/pages/es/contact.md`) MUST use `/img/email-icon.png` and `/img/whatsapp-icon.png` stored in `public/img/`.
- **FR-003**: Contact cards MUST include direct interactive CTAs for Email (`mailto:` + quick-copy option) and WhatsApp (`wa.me` deep link with pre-filled localized text).
- **FR-004**: Contact pages MUST maintain 100% i18n content parity between English (`/contact/`) and Spanish (`/es/contact/`).
- **FR-005**: Contact section layout MUST comply with the project Page Builder schema (`src/content/config.ts`) and adhere to Tailwind v4 / global design system styles.

### Key Entities

- **Contact Channel Entity**:
  - `heading`: Channel title (e.g. "Email", "WhatsApp", "Global Reach")
  - `copy`: Channel description or value (e.g. email address or phone text)
  - `icon_image`: Optional image URL path for custom brand icons (e.g. `/img/email-icon.png`)
  - `icon`: Optional text fallback icon
  - `button`: Primary action button details (`url`, `text`, `style`, `copy_action`)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of contact cards render custom PNG icons with correct dimensions and zero layout shift.
- **SC-002**: Both English and Spanish contact pages build cleanly with `npm run build` with 0 warnings or errors.
- **SC-003**: 100% key and layout parity between `/contact/` and `/es/contact/`.
- **SC-004**: Contact page achieves >95 score on mobile and desktop performance / SEO audits.

## Assumptions

- Images `email-icon.png` and `whatsapp-icon.png` are stored in `public/img/`.
- WhatsApp number format is `+57 305 431 5796` (international format `573054315796`).
- Email address is `astrologyforthefuture@gmail.com`.
