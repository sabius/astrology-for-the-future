# Feature Specification: Dedicated Video Pages & Indexing Optimization

**Feature Branch**: `007-individual-video-pages`

**Created**: 2026-08-09

**Status**: Draft

**Input**: User description: "We need to change the way videos are presented in the page. It seems we need specific video pages for each video. We could simplify the videos page and present the more specific information we have about each video in the video page. https://support.google.com/webmasters/answer/9495631#indexing_status"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Individual Video Watch Page Experience (Priority: P1)

As a visitor or search engine user, I want each video to have its own dedicated watch page URL (e.g., `/videos/most-relevant-events-2025/` in English and `/es/videos/eventos-mas-relevantes-2025/` in Spanish), where the video player is the prominent main feature accompanied by full detailed notes, so that Google can index each video individually and visitors enjoy a focused viewing experience.

**Why this priority**: Google Search Console requires videos to be the primary main content on dedicated pages to satisfy video indexing criteria (`VideoObject` structured data & main content prominence).

**Independent Test**: Navigate to `/videos/<slug>/` or `/es/videos/<slug>/`.
- Verify the video player iframe renders prominently at top.
- Verify full video title, detailed description, and notes display clearly below the player.
- Verify valid `schema.org/VideoObject` JSON-LD script is embedded in `<head>`.

**Acceptance Scenarios**:
1. **Given** a visitor loading `/videos/medical-astrology-decumbiture/`, **When** the page renders, **Then** the YouTube video player is prominently displayed with full medical astrology notes beneath it.
2. **Given** Googlebot crawling a dedicated video page, **When** inspecting page JSON-LD scripts, **Then** a valid `schema.org/VideoObject` object containing `name`, `description`, `thumbnailUrl`, `uploadDate`, and `embedUrl` is present.

---

### User Story 2 - Simplified Video Library Listing Page (Priority: P1)

As a site visitor browsing the video library (`/videos/` or `/es/videos/`), I want a clean, organized gallery of video cards displaying thumbnails, titles, and short summaries with links to dedicated watch pages, so that I can easily discover and choose videos to watch.

**Why this priority**: Replacing heavy multi-embed pages with a responsive card grid improves site performance, load times, and usability while directing users and crawlers to dedicated pages.

**Independent Test**: Visit `/videos/` or `/es/videos/`.
- Verify no multi-video heavy embeds block page loading.
- Verify each card shows thumbnail, title, excerpt, and a clear button linking to the dedicated video watch page.

**Acceptance Scenarios**:
1. **Given** a visitor visiting `/videos/`, **When** viewing the page, **Then** a clean grid of video cards displays with "Watch Video" buttons linking to `/videos/<slug>/`.
2. **Given** a visitor visiting `/es/videos/`, **When** viewing the page, **Then** a clean grid of video cards displays with "Ver Video" buttons linking to `/es/videos/<slug>/`.

---

### User Story 3 - SEO Canonical & Multilingual `hreflang` Alignment for Videos (Priority: P1)

As a search engine crawler, I want each dedicated video page to contain self-referencing canonical tags and reciprocal `hreflang` alternate tags linking the English and Spanish versions of the video page, so that search engines properly attribute localized video content.

**Why this priority**: Ensures dedicated video pages inherit the site's SEO standard and pass Google Search Console indexing checks without duplicate content penalties.

**Independent Test**: Inspect `<head>` of `/videos/<slug>/` and `/es/videos/<slug>/`.
- Verify `<link rel="canonical">` points to the specific video page URL.
- Verify `<link rel="alternate" hreflang="en">`, `<link rel="alternate" hreflang="es">`, and `hreflang="x-default"` point to matching video page URLs in both languages.

**Acceptance Scenarios**:
1. **Given** an English video page `/videos/most-relevant-events-2025/`, **When** inspecting head tags, **Then** `hreflang="en"` points to `/videos/most-relevant-events-2025/` and `hreflang="es"` points to `/es/videos/eventos-mas-relevantes-2025/`.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support individual dedicated video pages for all video content in both English (`/videos/<slug>/`) and Spanish (`/es/videos/<slug>/`).
- **FR-002**: Dedicated video pages MUST render the video player prominently as primary content, followed by full video notes and detailed copy.
- **FR-003**: Dedicated video pages MUST inject structured JSON-LD data (`schema.org/VideoObject`) containing `name`, `description`, `thumbnailUrl`, `uploadDate`, and `embedUrl`.
- **FR-004**: Main video library pages (`/videos/` and `/es/videos/`) MUST display a simplified card grid with video thumbnails, titles, short previews, and direct links to dedicated watch pages.
- **FR-005**: All dedicated video pages MUST generate self-referencing canonical links and bidirectional `hreflang` annotations (`en`, `es`, `x-default`).
- **FR-006**: Generated `sitemap-0.xml` MUST include all dedicated video page URLs.

### Key Entities

- **Video Entity**:
  - `id` / `slug`: Unique identifier for the video entry (e.g. `medical-astrology-decumbiture`)
  - `video_id`: YouTube video ID (e.g. `FE58K067L5s?start=1068` or cleaned ID `FE58K067L5s`)
  - `title`: Video title
  - `summary`: Short excerpt for listing cards
  - `copy`: Detailed markdown notes for dedicated watch page
  - `thumbnail`: Optional custom thumbnail image URL (defaults to YouTube HQ thumbnail `https://img.youtube.com/vi/<id>/hqdefault.jpg`)
  - `uploadDate`: ISO 8601 date string for VideoObject structured data

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of dedicated video pages render valid `VideoObject` JSON-LD schema without Google Structured Data testing errors.
- **SC-002**: Main `/videos/` listing page load time improves by >50% by replacing multiple heavy YouTube embeds with lightweight image thumbnails and card links.
- **SC-003**: All dedicated video pages and main video listing pages pass `npm run build` with 0 warnings or errors.
- **SC-004**: 100% of dedicated video page URLs appear in `dist/sitemap-0.xml` with matching canonical tags.

## Assumptions

- YouTube video IDs are available for all video items.
- Video thumbnails default to YouTube's public thumbnail service (`https://img.youtube.com/vi/<id>/hqdefault.jpg`) when no custom image is supplied.
- English is the default locale for `x-default` hreflang fallback.
