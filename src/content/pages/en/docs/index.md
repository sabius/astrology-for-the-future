---
meta:
  title: "Component Documentation"
  description: "Browse and explore all available components with examples and property definitions."
  image: "https://res.cloudinary.com/dvhwjf1zd/image/upload/v1760063474/image-asset_2_v5ailt.jpg"

content: []
---

# Component Documentation

Welcome to the component documentation! Here you can explore all available components used in the Astrology for the Future website. Each component page includes:

- **Live Preview**: See the component in action
- **Properties Table**: All available props with types and descriptions
- **Usage Examples**: How to use the component in your pages

## Available Components

### Layout Components

- **[Hero](/en/_docs/heroes)** - Full-width hero sections with background images, headers, and call-to-action buttons
- **[Split Content](/en/_docs/split-content)** - Two-column layouts for text and image combinations
- **[Feature Card](/en/_docs/feature-card)** - Feature showcases with images, lists, and CTAs

### Content Components

- **[Quote](/en/_docs/quote)** - Styled blockquotes with author attribution
- **[CTA](/en/_docs/cta)** - Call-to-action sections with buttons

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
