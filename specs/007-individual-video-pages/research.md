# Research & Technical Decisions: Dedicated Video Pages & Indexing Optimization

## 1. Google Video Indexing Requirements & Architecture

### Decision
Implement dedicated watch pages for every video in the library (`/videos/<slug>/` for English and `/es/videos/<slug>/` for Spanish), with prominent video player embedding, full transcript/notes copy, and `VideoObject` structured data.

### Rationale
According to [Google Search Console Video Indexing Guidelines](https://support.google.com/webmasters/answer/9495631#indexing_status):
1. **Main Content Prominence**: Google only indexes videos when the video is the primary feature on a dedicated page. Multiple video embeds on a single gallery page prevent Googlebot from identifying individual videos as main content.
2. **Structured Data (`schema.org/VideoObject`)**: Dedicated pages allow embedding explicit JSON-LD metadata (`name`, `description`, `thumbnailUrl`, `uploadDate`, `embedUrl`) tailored to each video.
3. **User Experience & Performance**: Replaces 6+ heavy YouTube iframe embeds on `/videos/` with lightweight card thumbnails, dramatically reducing initial page load time.

---

## 2. Content Structure & Route Mapping

### Decision
Store video entries as separate Markdown/Frontmatter files under `src/content/videos/en/` and `src/content/videos/es/` (or structured video entries in `src/content/videos/`), registered in `src/content/config.ts`.

### Schema & Entity Definition
```typescript
const videosCollection = defineCollection({
  schema: z.object({
    video_id: z.string(),          // YouTube video ID or embed path (e.g. "FE58K067L5s?start=1068")
    title: z.string(),             // Video title
    summary: z.string().optional(),// Short summary for card preview
    upload_date: z.string().optional(), // ISO string e.g. "2025-01-01"
    thumbnail: z.string().optional(),   // Optional custom thumbnail image
  })
});
```

### Route Patterns
- **English Dedicated Watch Page**: `https://glendaferreira.com/videos/<video-slug>/`
- **Spanish Dedicated Watch Page**: `https://glendaferreira.com/es/videos/<video-slug>/`
- **Main Video Library Gallery**: `https://glendaferreira.com/videos/` and `https://glendaferreira.com/es/videos/`

---

## 3. SEO, Canonical, & `hreflang` Mapping

### Decision
- Each dedicated video page receives a self-referencing `<link rel="canonical">`.
- Bidirectional `<link rel="alternate" hreflang="en">`, `<link rel="alternate" hreflang="es">`, and `hreflang="x-default"` tags pair corresponding English and Spanish video pages.
- Automatically included in `dist/sitemap-0.xml`.
