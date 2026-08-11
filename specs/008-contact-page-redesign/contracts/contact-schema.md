# Contact Component UI Contract

**Feature Branch**: `008-contact-page-redesign`

## Component Contracts

### 1. `FeatureGrid.astro` Props Interface

```typescript
export interface FeatureGridCard {
  icon?: string;
  icon_image?: string;
  heading?: string;
  copy?: string;
  button?: {
    url: string;
    text: string;
    style?: "primary" | "secondary" | "accent" | "outline";
    copy_text?: string;
  };
}

export interface FeatureGridProps {
  header?: string;
  copy?: string;
  cards?: FeatureGridCard[];
}
```

### 2. Copy Button Lit Web Component Contract (`src/components/Lit/CopyButton.ts`)

```typescript
// Custom Tag: <copy-button text="textToCopy" label="Copy Email"></copy-button>

export class CopyButton extends LitElement {
  text: string;
  label: string;
  copiedLabel: string;
  variant: string;
}
```
