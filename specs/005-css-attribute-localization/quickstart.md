# Quickstart & Verification Guide: Pure CSS Attribute Localization

## Verification Steps

1. Run local dev server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:4321/`.
3. Open browser DevTools Console and execute:
   ```javascript
   document.documentElement.lang = "es";
   ```
   - **Expected**: Spanish content, Spanish navigation (*Inicio*, *Videos*, *Contacto*), Spanish footer text, and Spanish WhatsApp prefilled message render cleanly.
4. Execute:
   ```javascript
   document.documentElement.lang = "en";
   ```
   - **Expected**: English content, English navigation (*Home*, *Videos*, *Contact*), English footer text, and English WhatsApp prefilled message render cleanly.
5. Run production build:
   ```bash
   npm run build
   ```
   - Verify build completes in <10s with 0 errors.
