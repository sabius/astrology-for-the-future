---
meta:
  title: "Quote Component"
  description: "Styled blockquotes with author attribution for testimonials or inspirational content."

content:
  - component: "quote"
    quote: "The stars have guided me to a deeper understanding of my life's purpose. This reading was truly transformative."
    author: "Sarah Johnson"
---

import ComponentProps from '../../../components/UI/ComponentProps.astro';

<ComponentProps
  componentName="Quote"
  props={[
    {
      name: 'quote',
      type: 'string',
      required: true,
      description: 'The quote text to display',
      example: '"Astrology is the poetry of the cosmos"'
    },
    {
      name: 'author',
      type: 'string',
      required: false,
      description: 'Name of the person being quoted',
      example: '"Jane Smith"'
    }
  ]}
/>

## Usage

The Quote component displays beautifully styled blockquotes, perfect for testimonials, inspirational quotes, or highlighting important statements.

### Example Configuration

```yaml
content:
  - component: "quote"
    quote: "My astrology reading provided clarity I had been seeking for years. Highly recommended!"
    author: "Michael Chen"
```

### Without Author

```yaml
content:
  - component: "quote"
    quote: "As above, so below. As within, so without."
```

### Best Practices

- Keep quotes concise and impactful (2-3 sentences maximum)
- Use for testimonials, reviews, or inspirational content
- Attribution adds credibility - include author when possible
- Quote should be meaningful and relevant to surrounding content
- Works well as a break between longer content sections
