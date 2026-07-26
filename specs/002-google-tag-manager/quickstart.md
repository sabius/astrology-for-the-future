# Quickstart Verification Guide: Google Tag Manager Integration

## Overview

This guide describes how to verify and validate the Google Tag Manager integration (`G-ERLJ63MV2B`) across pre-rendered static HTML builds and local development servers.

---

## Prerequisites

- Node.js installed
- Project dependencies installed (`npm install`)

---

## Step 1: Pre-Render Build Verification

Run the production build to ensure SSG compilation succeeds without errors:

```bash
npm run build
```

**Expected Outcome**: Build finishes cleanly with zero syntax or compilation errors.

---

## Step 2: HTML Output Inspection

Inspect pre-rendered output files in `dist/` to verify script injection:

### Windows PowerShell Verification Command:

```powershell
Select-String -Path "dist\index.html" -Pattern "G-ERLJ63MV2B"
Select-String -Path "dist\es\index.html" -Pattern "G-ERLJ63MV2B"
```

**Expected Outcome**: Both commands output matching lines containing `googletagmanager.com/gtag/js?id=G-ERLJ63MV2B` and `gtag('config', 'G-ERLJ63MV2B')`.

---

## Step 3: Local Dev Server Verification

Start the local development server:

```bash
npm run dev
```

1. Open browser developer tools on `http://localhost:4321`.
2. Inspect the `<head>` element of the document.
3. Open the Console tab and type:
   ```javascript
   window.dataLayer
   ```
4. Verify `window.dataLayer` is defined as an Array containing tracking arguments (`['js', Date]`, `['config', 'G-ERLJ63MV2B']`).
