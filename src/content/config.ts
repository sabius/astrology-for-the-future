import { defineCollection, z } from "astro:content";

const buttonStyle = z.enum(["primary", "secondary", "accent", "outline", "ghost"]);

const heroBlock = z.object({
  component: z.literal("hero"),
  hidden_h1: z.string().optional(),
  header: z.string().optional(),
  copy: z.string().optional(),
  button: z.object({ text: z.string(), url: z.string() }).optional(),
  background_image: z.string().optional(),
  image_alt: z.string().optional(),
});

const splitContentBlock = z.object({
  component: z.literal("split-content"),
  header: z.string().optional(),
  copy: z.string().optional(),
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
  component: z.literal("feature-card"),
  header: z.string().optional(),
  copy: z.string().optional(),
  image: z.string().optional(),
  image_alt: z.string().optional(),
  list_items: z
    .array(
      z.object({
        heading: z.string().optional(),
        copy: z.string().optional(),
      })
    )
    .optional(),
  button: z
    .object({ text: z.string(), url: z.string(), style: buttonStyle.optional() })
    .optional(),
});

const quoteBlock = z.object({
  component: z.literal("quote"),
  quote: z.string(),
  author: z.string().optional(),
});

const ctaButtonSchema = z.object({
  text: z.string(),
  url: z.string(),
  style: buttonStyle.optional(),
});

const ctaBlock = z.object({
  component: z.literal("cta"),
  eyebrow: z.string().optional(),
  header: z.string().optional(),
  copy: z.string().optional(),
  button: ctaButtonSchema,
  secondary_button: ctaButtonSchema.optional(),
  highlights: z.array(z.string()).optional(),
});

const featureGridBlock = z.object({
  component: z.literal("feature-grid"),
  header: z.string().optional(),
  copy: z.string().optional(),
  cards: z
    .array(
      z.object({
        icon: z.string().optional(),
        icon_image: z.string().optional(),
        heading: z.string().optional(),
        copy: z.string().optional(),
        button: z
          .object({
            text: z.string(),
            url: z.string(),
            style: buttonStyle.optional(),
            copy_text: z.string().optional(),
          })
          .optional(),
      })
    )
    .optional(),
});

const imageOverlayBlock = z.object({
  component: z.literal("image-overlay"),
  headline: z.string().optional(),
  subheadline: z.string().optional(),
  body_copy: z.union([z.string(), z.array(z.string())]).optional(),
  background_image: z.string().optional(),
  image_alt: z.string().optional(),
});

const videoSectionBlock = z.object({
  component: z.literal("video-section"),
  header: z.string().optional(),
  copy: z.string().optional(),
  videos: z
    .array(
      z.object({
        video_id: z.string(),
        title: z.string().optional(),
        copy: z.string().optional(),
        summary: z.string().optional(),
        url: z.string().optional(),
        upload_date: z.string().optional(),
        thumbnail: z.string().optional(),
      })
    )
    .optional(),
});

const videoDetailBlock = z.object({
  component: z.literal("video-detail"),
  video_id: z.string(),
  header: z.string().optional(),
  copy: z.string().optional(),
  upload_date: z.string().optional(),
  button: z
    .object({ text: z.string(), url: z.string(), style: buttonStyle.optional() })
    .optional(),
  prev_video: z
    .object({ text: z.string().optional(), title: z.string().optional(), url: z.string() })
    .optional(),
  next_video: z
    .object({ text: z.string().optional(), title: z.string().optional(), url: z.string() })
    .optional(),
});

const giftCardBlock = z.object({
  component: z.literal("gift-card"),
  eyebrow: z.string().optional(),
  header: z.string().optional(),
  copy: z.string().optional(),
  paragraphs: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  card_badge: z.string().optional(),
  card_title: z.string().optional(),
  card_subtitle: z.string().optional(),
  card_footer_left: z.string().optional(),
  card_footer_right: z.string().optional(),
  card_hint: z.string().optional(),
  button: ctaButtonSchema.optional(),
});

const celestialHeroBlock = z.object({
  component: z.literal("celestial-hero"),
  hidden_h1: z.string().optional(),
  eyebrow: z.string().optional(),
  header: z.string().optional(),
  copy: z.string().optional(),
  compact: z.boolean().optional(),
  button: ctaButtonSchema.optional(),
  secondary_button: ctaButtonSchema.optional(),
  highlights: z.array(z.string()).optional(),
});

const featuredVideoBlock = z.object({
  component: z.literal("featured-video"),
  eyebrow: z.string().optional(),
  header: z.string(),
  copy: z.string().optional(),
  video_id: z.string(),
  source_label: z.string().optional(),
  language_note: z.string().optional(),
  play_label: z.string().optional(),
  youtube_label: z.string().optional(),
  button: ctaButtonSchema.optional(),
});

// Define the main collection for our pages
const pagesCollection = defineCollection({
  schema: z.object({
    meta: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string().url().optional(),
      video_id: z.string().optional(),
      upload_date: z.string().optional(),
      en_url: z.string().optional(),
      es_url: z.string().optional(),
    }),
    content: z.array(
      // This tells Zod that `content` is an array of one of our defined blocks
      z.discriminatedUnion("component", [
        heroBlock,
        celestialHeroBlock,
        featuredVideoBlock,
        splitContentBlock,
        featureCardBlock,
        featureGridBlock,
        quoteBlock,
        imageOverlayBlock,
        ctaBlock,
        videoSectionBlock,
        videoDetailBlock,
        giftCardBlock,
      ])
    ),
  }),
});

export const collections = {
  pages: pagesCollection,
};
