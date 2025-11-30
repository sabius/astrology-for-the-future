---
meta:
  title: "Feature Card Component"
  description: "Feature showcases with images, lists, and call-to-action buttons."

content:
  - component: "feature-card"
    header: "Featured Service"
    copy: "Discover what makes our astrology readings special"
    image: "https://res.cloudinary.com/dvhwjf1zd/image/upload/v1758152929/image-asset_zlvc49.webp"
    image_alt: "Astrology reading session"
    list_items:
      - heading: "Personalized Approach"
        copy: "Every reading is tailored to your unique birth chart and current life circumstances."
      - heading: "Expert Analysis"
        copy: "Our astrologers have decades of experience interpreting celestial patterns."
      - heading: "Actionable Insights"
        copy: "Receive practical guidance you can apply to your daily life."
    button:
      text: "Learn More"
      url: "/services"
---

import ComponentProps from '../../../components/UI/ComponentProps.astro';

<ComponentProps
  componentName="Feature Card"
  props={[
    {
      name: 'header',
      type: 'string',
      required: false,
      description: 'Main heading for the feature section',
      example: '"Our Services"'
    },
    {
      name: 'copy',
      type: 'string',
      required: false,
      description: 'Introductory text or description',
      example: '"Explore our comprehensive astrology offerings"'
    },
    {
      name: 'image',
      type: 'string (URL)',
      required: false,
      description: 'URL of the featured image',
      example: '"https://example.com/feature.jpg"'
    },
    {
      name: 'image_alt',
      type: 'string',
      required: false,
      description: 'Alternative text for the image',
      example: '"Astrology consultation room"'
    },
    {
      name: 'list_items',
      type: 'array',
      required: false,
      description: 'Array of feature items to display',
      example: '[{ heading: "Title", copy: "Description" }]'
    },
    {
      name: 'list_items[].heading',
      type: 'string',
      required: false,
      description: 'Heading for each list item',
      example: '"24/7 Availability"'
    },
    {
      name: 'list_items[].copy',
      type: 'string',
      required: false,
      description: 'Description text for each list item',
      example: '"Access readings anytime, anywhere"'
    },
    {
      name: 'button',
      type: 'object',
      required: false,
      description: 'Optional call-to-action button',
      example: '{ text: "Get Started", url: "/signup" }'
    },
    {
      name: 'button.text',
      type: 'string',
      required: true,
      description: 'Text displayed on the button',
      example: '"View Details"'
    },
    {
      name: 'button.url',
      type: 'string',
      required: true,
      description: 'URL or path the button links to',
      example: '"/features"'
    },
    {
      name: 'button.variant',
      type: 'string',
      required: false,
      description: 'Button style variant',
      example: '"primary"'
    }
  ]}
/>

## Usage

The Feature Card component creates a two-column layout highlighting features or services with an accompanying image and list of benefits.

### Example Configuration

```yaml
content:
  - component: "feature-card"
    header: "Why Choose Us"
    copy: "Experience the difference"
    image: "https://example.com/features.jpg"
    image_alt: "Our unique features"
    list_items:
      - heading: "Accurate Predictions"
        copy: "Based on precise calculations"
      - heading: "Easy to Understand"
        copy: "Clear, jargon-free explanations"
    button:
      text: "See All Features"
      url: "/features"
```

### Best Practices

- Use high-quality images that represent your features
- Keep list items concise (3-5 items works best)
- Each list item should have both a heading and description
- Use action-oriented button text
- Ensure image complements the text content
