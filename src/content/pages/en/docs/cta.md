---
meta:
  title: "CTA Component"
  description: "Call-to-action sections with buttons to drive user engagement."
  image: "https://res.cloudinary.com/dvhwjf1zd/image/upload/v1760063474/image-asset_2_v5ailt.jpg"

content:
  - component: "cta"
    header: "Ready to Discover Your Path?"
    button:
      text: "Book Your Reading Now"
      url: "/booking"
      style: "primary"
---

import ComponentProps from '../../../components/UI/ComponentProps.astro';

<ComponentProps
  componentName="CTA (Call to Action)"
  props={[
    {
      name: 'header',
      type: 'string',
      required: false,
      description: 'Heading text that appears above the button',
      example: '"Start Your Journey Today"'
    },
    {
      name: 'button',
      type: 'object',
      required: true,
      description: 'Button configuration object',
      example: '{ text: "Get Started", url: "/signup" }'
    },
    {
      name: 'button.text',
      type: 'string',
      required: true,
      description: 'Text displayed on the button',
      example: '"Book Now"'
    },
    {
      name: 'button.url',
      type: 'string',
      required: true,
      description: 'URL or path the button links to',
      example: '"/contact"'
    },
    {
      name: 'button.style',
      type: 'string',
      required: false,
      description: 'Visual style of the button',
      example: '"primary"'
    }
  ]}
/>

## Usage

The CTA (Call to Action) component creates prominent sections designed to encourage user action. Perfect for driving conversions and engagement.

### Example Configuration

```yaml
content:
  - component: "cta"
    header: "Take the First Step"
    button:
      text: "Schedule a Reading"
      url: "/schedule"
      style: "primary"
```

### Minimal CTA (No Header)

```yaml
content:
  - component: "cta"
    button:
      text: "Contact Us"
      url: "/contact"
```

### Best Practices

- Place CTAs strategically throughout your pages
- Use action-oriented button text (verbs like "Get", "Start", "Book")
- Keep headers short and compelling
- Create urgency when appropriate ("Today", "Now", "Limited Time")
- Test different placements and messaging
- Ensure the CTA stands out visually from surrounding content
- Link to relevant pages (booking forms, contact pages, etc.)
