import { defineCollection, z } from 'astro:content';

const heroBlock = z.object({
  component: z.literal('hero'),
  header: z.string().optional(),
  copy: z.string().optional(),
  button: z.object({ text: z.string(), url: z.string(), }).optional(),
  background_image: z.string().optional(),
  image_alt: z.string().optional(),
});

const splitContentBlock = z.object({
  component: z.literal('split-content'),
  background_color: z.string().optional(),
  columns: z.array(
    z.object({
      items: z
        .array(
          z.object({
            heading: z.string().optional(),
            copy: z.union([z.string(), z.array(z.string())]).optional(),
            meta: z.string().optional(),
            image: z.string().optional(),
            image_alt: z.string().optional(),
            legend: z.string().optional(),
            boxed: z.boolean().optional(),
          })
        )
        .optional(),
    })
  ),
});

const featureCardBlock = z.object({
  component: z.literal('feature-card'),
  header: z.string().optional(),
  copy: z.string().optional(),
  image: z.string().optional(),
  image_alt: z.string().optional(),
  list_items: z.array(
    z.object({
      heading: z.string().optional(),
      copy: z.string().optional(),
    })
  ).optional(),
  button: z.object({ text: z.string(), url: z.string(), style: z.string().optional() }).optional(),
});

const bioBlock = z.object({
  component: z.literal('bio'),
  title: z.string().optional(),
  role: z.string().optional(),
  headline: z.string().optional(),
  tags: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  body: z.array(z.string()).optional(),
  image: z.string().optional(),
  image_alt: z.string().optional(),
  buttons: z
    .array(
      z.object({
        text: z.string(),
        url: z.string(),
        style: z.string().optional(),
        target: z.string().optional(),
      })
    )
    .optional(),
});

const quoteBlock = z.object({
  component: z.literal('quote'),
  quote: z.string(),
  author: z.string().optional(),
});

const ctaBlock = z.object({
  component: z.literal('cta'),
  header: z.string().optional(),
  button: z.object({ text: z.string(), url: z.string(), style: z.string().optional() }),
});

const featureGridBlock = z.object({
  component: z.literal('feature-grid'),
  header: z.string().optional(),
  copy: z.string().optional(),
  cards: z.array(
    z.object({
      icon: z.string().optional(),
      heading: z.string().optional(),
      copy: z.string().optional(),
      button: z.object({ 
        text: z.string(), 
        url: z.string(), 
        style: z.string().optional() 
      }).optional(),
    })
  ).optional(),
});

// Define the main collection for our pages
const pagesCollection = defineCollection({
  schema: z.object({
    meta: z.object({
      title: z.string(),
      description: z.string(),
    }),
    content: z.array(
      // This tells Zod that `content` is an array of one of our defined blocks
      z.discriminatedUnion('component', [
        heroBlock,
        splitContentBlock,
        featureCardBlock,
        bioBlock,
        featureGridBlock,
        quoteBlock,
        ctaBlock,
      ])
    ),
  }),
});

export const collections = {
  pages: pagesCollection
}
