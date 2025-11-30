---
meta:
  title: "Split Content Component"
  description: "Two-column layouts for text and image combinations with flexible content arrangement."

content:
  - component: "split-content"
    background_color: "#f9f7fc"
    columns:
      - items:
          - heading: "First Column Heading"
            copy:
              - "This is a paragraph in the first column. The split content component allows you to create beautiful two-column layouts."
              - "You can add multiple paragraphs to create rich content sections."
            meta: "Additional metadata text"
      - items:
          - image: "https://res.cloudinary.com/dvhwjf1zd/image/upload/v1758152929/image-asset_zlvc49.webp"
            image_alt: "Example image"
            legend: "Caption text for the image"
---

import ComponentProps from '../../../components/UI/ComponentProps.astro';

<ComponentProps
  componentName="Split Content"
  props={[
    {
      name: 'background_color',
      type: 'string (hex color)',
      required: false,
      description: 'Background color for the entire section',
      example: '"#f9f7fc"'
    },
    {
      name: 'columns',
      type: 'array',
      required: true,
      description: 'Array of column objects (maximum 2 columns)',
      example: '[{ items: [...] }, { items: [...] }]'
    },
    {
      name: 'columns[].items',
      type: 'array',
      required: true,
      description: 'Array of content items within each column',
      example: '[{ heading: "Title", copy: ["Text"] }]'
    },
    {
      name: 'columns[].items[].heading',
      type: 'string',
      required: false,
      description: 'Heading text for a content block',
      example: '"About Our Services"'
    },
    {
      name: 'columns[].items[].copy',
      type: 'string | array',
      required: false,
      description: 'Body text - can be a single string or array of paragraphs',
      example: '["First paragraph", "Second paragraph"]'
    },
    {
      name: 'columns[].items[].meta',
      type: 'string',
      required: false,
      description: 'Additional metadata or supplementary text',
      example: '"Last updated: November 2025"'
    },
    {
      name: 'columns[].items[].image',
      type: 'string (URL)',
      required: false,
      description: 'URL of an image to display',
      example: '"https://example.com/photo.jpg"'
    },
    {
      name: 'columns[].items[].image_alt',
      type: 'string',
      required: false,
      description: 'Alternative text for the image',
      example: '"Team photo in the office"'
    },
    {
      name: 'columns[].items[].legend',
      type: 'string',
      required: false,
      description: 'Caption text displayed below an image',
      example: '"Photo taken in June 2025"'
    },
    {
      name: 'columns[].items[].boxed',
      type: 'boolean',
      required: false,
      description: 'Whether to display the content in a bordered card with shadow',
      example: 'true'
    }
  ]}
/>

## Usage

The Split Content component creates flexible two-column layouts that can combine text and images. Each column can contain multiple items that are either text blocks or images.

### Example Configuration

```yaml
content:
  - component: "split-content"
    background_color: "#f0f0f0"
    columns:
      - items:
          - heading: "Our Story"
            copy:
              - "Founded in 2020..."
              - "Our mission is to..."
          - heading: "Our Values"
            copy: "Integrity, compassion, wisdom"
            boxed: true
      - items:
          - image: "https://example.com/team.jpg"
            image_alt: "Our team"
            legend: "The team at work"
```

### Best Practices

- Limit to 2 columns for optimal readability
- Mix text and images for visual interest
- Use `boxed: true` to highlight important text blocks
- Provide alt text for all images
- Keep paragraphs concise and scannable
