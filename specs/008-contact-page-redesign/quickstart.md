# Quickstart & Validation Guide: Contact Page Redesign

**Feature Branch**: `008-contact-page-redesign`

## Setup & Running Locally

Ensure dev environment is running:

```bash
npm run dev
```

Visit the contact pages in your browser:
- English: `http://localhost:4321/contact/`
- Spanish: `http://localhost:4321/es/contact/`

## Validation Scenarios

### Scenario 1: Verify Visual Asset Loading & Rendering
1. Open `http://localhost:4321/contact/`.
2. Verify the Email card renders `public/img/email-icon.png` (crisp image, scaled to ~64px-80px with proper padding).
3. Verify the WhatsApp card renders `public/img/whatsapp-icon.png`.
4. Inspect Network tab to ensure images return HTTP 200 from `/img/email-icon.png` and `/img/whatsapp-icon.png`.

### Scenario 2: Test Interactive CTAs
1. Click **Send Email**: Verify system triggers `mailto:astrologyforthefuture@gmail.com`.
2. Click **Message Me** (WhatsApp): Verify browser launches `https://wa.me/573054315796?text=...` with pre-populated message.
3. Test Copy Email button (if present): Verify text `astrologyforthefuture@gmail.com` is copied to system clipboard with a "Copied!" visual toast.

### Scenario 3: Build & i18n Parity Check
Run local production build:

```bash
npm run build
```

Confirm build completes with 0 errors and `dist/contact/index.html` and `dist/es/contact/index.html` both generate properly with matching assets.
