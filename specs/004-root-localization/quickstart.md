# Quickstart & Validation Guide: Root Domain Localization

## Prerequisites
- Node.js environment with dependencies installed (`npm install`).
- Git Bash shell execution environment.

## Step 1: Run Local Development Server

```bash
npm run dev
```

Navigate to `http://localhost:4321/`:
- **Verification**: Notice that the browser URL stays `http://localhost:4321/` (does NOT redirect to `http://localhost:4321/en` or `/es`).

## Step 2: Verify Browser Language Detection

1. Open Browser DevTools (F12) -> Console.
2. Emulate Spanish browser language:
   ```javascript
   Object.defineProperty(navigator, 'language', { value: 'es-ES', configurable: true });
   ```
3. Refresh `http://localhost:4321/`.
4. **Expected Result**: Page displays Spanish homepage content while remaining on `http://localhost:4321/`.

5. Emulate English browser language:
   ```javascript
   Object.defineProperty(navigator, 'language', { value: 'en-US', configurable: true });
   ```
6. Clear `localStorage.removeItem('user_lang')` and refresh `http://localhost:4321/`.
7. **Expected Result**: Page displays English homepage content while remaining on `http://localhost:4321/`.

## Step 3: Verify Direct Localized URLs

1. Open `http://localhost:4321/en`.
   - **Expected Result**: Displays English content at URL `http://localhost:4321/en`.
2. Open `http://localhost:4321/es`.
   - **Expected Result**: Displays Spanish content at URL `http://localhost:4321/es`.
3. Open `http://localhost:4321/es/videos`.
   - **Expected Result**: Displays Spanish videos page at URL `http://localhost:4321/es/videos`.

## Step 4: Verify Production Build & SSG HTML Output

```bash
npm run build
```

Verify build completion without errors or warnings.
Check `dist/index.html`, `dist/en/index.html`, and `dist/es/index.html`:
- `dist/index.html` exists and contains full pre-rendered HTML without `<meta http-equiv="refresh">` redirect tag.
