import Hero from './Sections/Hero.astro';
import SplitContent from './Sections/SplitContent.astro';
import FeatureCard from './Sections/FeatureCard.astro';
import FeatureGrid from './Sections/FeatureGrid.astro';
import Cta from './UI/Cta.astro';
import Fallback from './Fallback.astro';

export const components = {
  'hero': Hero,
  'split-content': SplitContent,
  'feature-card': FeatureCard,
  'feature-grid': FeatureGrid,
  'cta': Cta,
  'fallback': Fallback,
};
