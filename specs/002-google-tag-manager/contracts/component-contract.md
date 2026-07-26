# Interface Contract: Google Tag Manager Component

## Overview

This contract defines the component interface and properties for `GoogleTagManager.astro`.

---

## Astro Component Interface (`GoogleTagManager.astro`)

```typescript
export interface Props {
  /**
   * Google Tag / Analytics measurement container ID.
   * If omitted, falls back to `import.meta.env.PUBLIC_GTM_ID` or 'G-ERLJ63MV2B'.
   */
  id?: string;
}
```

---

## HTML Output Contract

When rendered into page `<head>`, `GoogleTagManager.astro` MUST produce the following HTML structure:

```html
<!-- Google Tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ERLJ63MV2B"></script>
<script is:inline>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-ERLJ63MV2B');
</script>
```

### Constraints & Invariants

1. **Inline Script Execution**: The configuration script MUST use `is:inline` directive in Astro to ensure it is rendered verbatim into the HTML `<head>` without scope bundling or postponement.
2. **Asynchronous External Script**: The external script tag MUST include the `async` attribute to prevent render-blocking.
3. **Container ID Consistency**: Both the external script URL parameter (`?id=...`) and the inline `gtag('config', '...')` parameter MUST match the configured container ID (`G-ERLJ63MV2B`).
