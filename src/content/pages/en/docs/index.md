---
meta:
  title: "Component Documentation"
  description: "Browse and explore all available components with examples and property definitions."

content: []
---

# Component Documentation

Welcome to the component documentation! Here you can explore all available components used in the Astrology for the Future website. Each component page includes:

- **Live Preview**: See the component in action
- **Properties Table**: All available props with types and descriptions
- **Usage Examples**: How to use the component in your pages

## Available Components

### Layout Components

- **[Hero](/en/docs/heroes)** - Full-width hero sections with background images, headers, and call-to-action buttons
- **[Split Content](/en/docs/split-content)** - Two-column layouts for text and image combinations
- **[Feature Card](/en/docs/feature-card)** - Feature showcases with images, lists, and CTAs

### Content Components

- **[Quote](/en/docs/quote)** - Styled blockquotes with author attribution
- **[CTA](/en/docs/cta)** - Call-to-action sections with buttons

## How to Use

Each component is defined in your markdown frontmatter under the `content` array. Simply specify the component type and provide the required properties:

```yaml
content:
  - component: "hero"
    header: "Your Header"
    copy: "Your description"
    button:
      text: "Click Here"
      url: "/page"
```

Browse the individual component pages in the sidebar to see all available properties and examples.
