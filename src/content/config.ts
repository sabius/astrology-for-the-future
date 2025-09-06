import { defineCollection, z } from 'astro:content';

const heroBlock = z.object({
  component: z.literal('hero'),
  header: z.string(),
  copy: z.string(),
  button: z.object({ text: z.string(), url: z.string(), }).optional()
});

const splitContentBlock = z.object({
  component: z.literal('split-content'),
  image: z.string(),
  image_alt: z.string(),
  header: z.string(),
  copy: z.string(),
  image_position: z.enum(['left', 'right']).optional(),
});

const ctaBlock = z.object({
  component: z.literal('cta'),
  header: z.string(),
  button: z.object({ text: z.string(), url: z.string(), style: z.string().optional() }),
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
        ctaBlock,
      ])
    ),
  }),
});

export const collections = {
  pages: pagesCollection
}
