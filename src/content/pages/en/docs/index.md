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

## Foundations

- **[Design System Explorer](/docs/design-system)** - Interactive palette, typography, and component theme playground for Astrology for the Future

## Available Components

### Layout Components

- **[Hero](/docs/heroes)** - Full-width hero sections with background images, headers, and call-to-action buttons
- **[Split Content](/docs/split-content)** - Two-column layouts for text and image combinations
- **[Feature Card](/docs/feature-card)** - Feature showcases with images, lists, and CTAs
- **[Gift Card](/docs/gift-card)** - Interactive HTML5 Canvas celestial gift card with 3D pointer tilt and gold foil sheen

### Content Components

- **[Quote](/docs/quote)** - Styled blockquotes with author attribution
- **[CTA](/docs/cta)** - Call-to-action sections with buttons

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
