# Data Model & Schema: Dedicated Video Pages

## Video Collection Schema (`src/content/config.ts`)

```typescript
const videoEntry = z.object({
  title: z.string(),
  description: z.string().optional(),
  video_id: z.string(),              // YouTube ID e.g. "FE58K067L5s?start=1068"
  upload_date: z.string().optional(), // ISO date e.g. "2025-01-15"
  thumbnail: z.string().optional(),   // Optional image URL override
  slug_pair: z.string().optional(),   // Mapping key for Spanish/English hreflang matching
});
```

## VideoObject JSON-LD Structure

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "The Most Relevant Events of 2025",
  "description": "Astrological analysis of 2025...",
  "thumbnailUrl": [
    "https://img.youtube.com/vi/FE58K067L5s/hqdefault.jpg"
  ],
  "uploadDate": "2025-01-15T00:00:00Z",
  "embedUrl": "https://www.youtube.com/embed/FE58K067L5s?start=1068"
}
```

## URL Route Mapping Entity

| Video Title | English Dedicated Route | Spanish Dedicated Route |
| :--- | :--- | :--- |
| Most Relevant Events of 2025 | `/videos/most-relevant-events-2025/` | `/es/videos/eventos-mas-relevantes-2025/` |
| Medical Astrology: The Decumbiture | `/videos/medical-astrology-decumbiture/` | `/es/videos/astrologia-medica-decumbitura/` |
| The Astrologer in TODAY's World | `/videos/astrologer-in-todays-world/` | `/es/videos/el-astrologo-en-el-mundo-de-hoy/` |
| International Online Astrology Congress | `/videos/6th-international-astrology-congress-2024/` | `/es/videos/6to-congreso-internacional-de-astrologia-2024/` |
| Traditional Medical Astrology Lee Lehman | `/videos/traditional-medical-astrology-lee-lehman/` | `/es/videos/astrologia-medica-tradicional-lee-lehman/` |
| Pluto in Aquarius Saturn in Pisces | `/videos/pluto-aquarius-saturn-pisces-2023/` | `/es/videos/pluton-en-acuario-saturno-en-piscis-2023/` |
