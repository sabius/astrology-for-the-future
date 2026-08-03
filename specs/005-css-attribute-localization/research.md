# Research: Pure CSS Attribute Localization

## Architectural Decision

Refactor root domain localization from JS string style injections (`style.innerHTML = "..."`) to declarative CSS attribute rules.

### CSS Rules (`src/styles/global.css`)
```css
html:not([lang="es"]) .lang-es {
  display: none !important;
}

html[lang="es"] .lang-en {
  display: none !important;
}
```

### Inline Script (`src/pages/index.astro`)
```html
<script is:inline>
  (function () {
    let lang = "en";
    let saved = null;
    try {
      saved = localStorage.getItem("user_lang");
    } catch (e) {}

    if (saved === "es" || saved === "en") {
      lang = saved;
    } else {
      try {
        const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
        if (nav.startsWith("es")) lang = "es";
      } catch (e) {}
    }

    document.documentElement.lang = lang;
  })();
</script>
```

### Advantages
1. **0 Hardcoded JS Strings**: No string concatenation or dynamic `<style>` element creation.
2. **Layout Preservation**: Elements maintain their native Tailwind layout styles (`grid`, `flex`, `block`).
3. **0 Dependencies**: Pure CSS + 1-line attribute assignment.
