# Data Model & Schema Definitions: CSS Attribute Localization

## Entities

### Document Language Attribute State
The root `<html>` element acts as the single source of truth for language visibility:
- `document.documentElement.lang = "es"` -> displays `.lang-es` elements, hides `.lang-en` elements.
- `document.documentElement.lang = "en"` -> displays `.lang-en` elements, hides `.lang-es` elements.
