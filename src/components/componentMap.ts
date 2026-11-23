import Hero from "./Sections/Hero.astro";
import CelestialHero from "./Sections/CelestialHero.astro";
import SplitContent from "./Sections/SplitContent.astro";
import FeatureCard from "./Sections/FeatureCard.astro";
import FeatureGrid from "./Sections/FeatureGrid.astro";
import Quote from "./Sections/Quote.astro";
import ImageOverlay from "./Sections/ImageOverlay.astro";
import VideoSection from "./Sections/VideoSection.astro";
import VideoDetail from "./Sections/VideoDetail.astro";
import FeaturedVideo from "./Sections/FeaturedVideo.astro";
import GiftCard from "./Sections/GiftCard.astro";
import Cta from "./UI/Cta.astro";
import Fallback from "./Fallback.astro";

export const components = {
  hero: Hero,
  "celestial-hero": CelestialHero,
  "featured-video": FeaturedVideo,
  "split-content": SplitContent,
  "feature-card": FeatureCard,
  "feature-grid": FeatureGrid,
  quote: Quote,
  "image-overlay": ImageOverlay,
  "video-section": VideoSection,
  "video-detail": VideoDetail,
  "gift-card": GiftCard,
  cta: Cta,
  fallback: Fallback,
};
