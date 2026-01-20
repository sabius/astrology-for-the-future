---
meta:
  title: "Hero Component"
  description: "Full-width hero sections with background images, headers, and call-to-action buttons."
  image: "https://res.cloudinary.com/dvhwjf1zd/image/upload/v1760063474/image-asset_2_v5ailt.jpg"

content:
  - component: "hero"
    header: "Hero Component Example"
    copy: "This is a powerful hero section that captures attention with a stunning background image and clear call-to-action."
    background_image: "https://res.cloudinary.com/dvhwjf1zd/image/upload/v1758152929/image-asset_zlvc49.webp"
    image_alt: "The photo of a starred sky and an aurora boreal"
    button:
      text: "Book a reading"
      url: "/about"
---

import ComponentProps from '../../../components/UI/ComponentProps.astro';

<ComponentProps
  componentName="Hero"
  props={[
    {
      name: 'header',
      type: 'string',
      required: false,
      description: 'The main heading text displayed in the hero section',
      example: '"Welcome to Astrology"'
    },
    {
      name: 'copy',
      type: 'string',
      required: false,
      description: 'The description or body text displayed below the header',
      example: '"Discover your cosmic journey with personalized readings"'
    },
    {
      name: 'background_image',
      type: 'string (URL)',
      required: false,
      description: 'URL of the background image for the hero section',
      example: '"https://example.com/image.jpg"'
    },
    {
      name: 'image_alt',
      type: 'string',
      required: false,
      description: 'Alternative text for the background image (accessibility)',
      example: '"Beautiful starry night sky"'
    },
    {
      name: 'button',
      type: 'object',
      required: false,
      description: 'Call-to-action button configuration',
      example: '{ text: "Get Started", url: "/contact" }'
    },
    {
      name: 'button.text',
      type: 'string',
      required: true,
      description: 'Text displayed on the button',
      example: '"Book a Reading"'
    },
    {
      name: 'button.url',
      type: 'string',
      required: true,
      description: 'URL or path the button links to',
      example: '"/booking"'
    }
  ]}
/>

## Usage

The Hero component creates an eye-catching full-width section perfect for landing pages. It features:

- Responsive background image with overlay
- Large, bold typography
- Optional call-to-action button
- Progressive image loading with fade-in animation

### Example Configuration

```yaml
content:
  - component: "hero"
    header: "Astrology for the Future"
    copy: "Personalized readings to guide your journey"
    background_image: "https://example.com/hero-bg.jpg"
    image_alt: "Starry night sky"
    button:
      text: "Book Now"
      url: "/booking"
```

### Best Practices

- Use high-quality, wide images (at least 1920px width)
- Keep header text concise (5-8 words)
- Ensure good contrast between text and background
- Always provide meaningful alt text for accessibility
