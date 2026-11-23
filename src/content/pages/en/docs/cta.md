---
meta:
  title: "CTA Component"
  description: "Call-to-action sections with buttons to drive user engagement."
  image: "https://res.cloudinary.com/dvhwjf1zd/image/upload/v1760063474/image-asset_2_v5ailt.jpg"

content:
  - component: "cta"
    eyebrow: "Personalized Consultation"
    header: "Ready to Discover Your Path?"
    copy: "Book a private online reading tailored to your natal chart and current planetary cycles."
    button:
      text: "Book Your Reading Now"
      url: "/contact"
      style: "accent"
    secondary_button:
      text: "Contact Options"
      url: "/contact"
      style: "ghost"
    highlights:
      - "Online via Zoom"
      - "HD session recording"
      - "English & Spanish"
---

import ComponentProps from "../../../components/UI/ComponentProps.astro";

<ComponentProps
  componentName="CTA (Call to Action)"
  props={[
    {
      name: "eyebrow",
      type: "string",
      required: false,
      description: "Short uppercase badge displayed above the heading",
      example: '"Personalized Consultation"',
    },
    {
      name: "header",
      type: "string",
      required: false,
      description: "Heading text that appears above the description and buttons",
      example: '"Start Your Journey Today"',
    },
    {
      name: "copy",
      type: "string",
      required: false,
      description: "Supporting description paragraph beneath the heading",
      example: '"Book a private online reading tailored to your natal chart."',
    },
    {
      name: "button",
      type: "object",
      required: true,
      description: "Primary button configuration object",
      example: '{ text: "Book Now", url: "/contact", style: "accent" }',
    },
    {
      name: "button.text",
      type: "string",
      required: true,
      description: "Text displayed on the button",
      example: '"Book Now"',
    },
    {
      name: "button.url",
      type: "string",
      required: true,
      description: "URL or path the button links to (external URLs open in a new tab)",
      example: '"/contact"',
    },
    {
      name: "button.style",
      type: "string",
      required: false,
      description: "Button variant: primary | secondary | accent | outline",
      example: '"accent"',
    },
    {
      name: "secondary_button",
      type: "object",
      required: false,
      description: "Optional secondary button configuration object",
      example: '{ text: "Contact Options", url: "/contact", style: "secondary" }',
    },
    {
      name: "highlights",
      type: "string[]",
      required: false,
      description: "Optional short trust points shown along the bottom divider",
      example: '["Online via Zoom", "HD session recording"]',
    },
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
