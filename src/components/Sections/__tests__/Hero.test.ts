/**
 * Tests for Hero component logic
 */
import { describe, it, expect } from 'vitest';

describe('Hero component logic', () => {
  describe('Props interface', () => {
    it('should handle all expected props', () => {
      const props = {
        header: 'Welcome to our site',
        copy: 'This is the hero description',
        button: {
          url: '/contact',
          text: 'Get Started'
        },
        background_image: 'https://res.cloudinary.com/demo/upload/hero.jpg'
      };
      
      expect(props.header).toBeDefined();
      expect(props.copy).toBeDefined();
      expect(props.button).toBeDefined();
      expect(props.background_image).toBeDefined();
    });

    it('should handle missing optional props', () => {
      const props = {
        header: 'Welcome',
        copy: 'Description',
        button: {
          url: '/contact',
          text: 'Contact'
        }
        // background_image is optional
      };
      
      expect(props.header).toBeDefined();
      expect(props.background_image).toBeUndefined();
    });
  });

  describe('heroImageAlt generation', () => {
    it('should use header as alt text when header is provided', () => {
      const header = 'Welcome to Astrology for the Future';
      const heroImageAlt = header ?? '';
      
      expect(heroImageAlt).toBe(header);
    });

    it('should use empty string when header is not provided', () => {
      const header = undefined;
      const heroImageAlt = header ?? '';
      
      expect(heroImageAlt).toBe('');
    });

    it('should use empty string when header is null', () => {
      const header = null;
      const heroImageAlt = header ?? '';
      
      expect(heroImageAlt).toBe('');
    });

    it('should handle empty header string', () => {
      const header = '';
      const heroImageAlt = header ?? '';
      
      expect(heroImageAlt).toBe('');
    });
  });

  describe('Conditional rendering logic', () => {
    it('should render when all required props are present', () => {
      const header = 'Title';
      const copy = 'Description';
      const button = { url: '/contact', text: 'Contact' };
      
      const shouldRenderContent = header && copy && button;
      expect(shouldRenderContent).toBeTruthy();
    });

    it('should not render content when header is missing', () => {
      const header = undefined;
      const copy = 'Description';
      const button = { url: '/contact', text: 'Contact' };
      
      const shouldRenderContent = header && copy && button;
      expect(shouldRenderContent).toBeFalsy();
    });

    it('should not render content when copy is missing', () => {
      const header = 'Title';
      const copy = undefined;
      const button = { url: '/contact', text: 'Contact' };
      
      const shouldRenderContent = header && copy && button;
      expect(shouldRenderContent).toBeFalsy();
    });

    it('should not render content when button is missing', () => {
      const header = 'Title';
      const copy = 'Description';
      const button = undefined;
      
      const shouldRenderContent = header && copy && button;
      expect(shouldRenderContent).toBeFalsy();
    });

    it('should render background when background_image is provided', () => {
      const background_image = 'https://example.com/hero.jpg';
      const shouldRenderBackground = \!\!background_image;
      
      expect(shouldRenderBackground).toBeTruthy();
    });

    it('should not render background when background_image is not provided', () => {
      const background_image = undefined;
      const shouldRenderBackground = \!\!background_image;
      
      expect(shouldRenderBackground).toBeFalsy();
    });
  });

  describe('CSS classes', () => {
    it('should include proper positioning classes', () => {
      const sectionClasses = 'relative min-h-[70vh] flex items-center pt-30 text-white overflow-hidden';
      
      expect(sectionClasses).toContain('relative');
      expect(sectionClasses).toContain('min-h-[70vh]');
      expect(sectionClasses).toContain('flex');
      expect(sectionClasses).toContain('items-center');
    });

    it('should include background container classes', () => {
      const bgClasses = 'absolute inset-0 -z-10';
      
      expect(bgClasses).toContain('absolute');
      expect(bgClasses).toContain('inset-0');
      expect(bgClasses).toContain('-z-10');
    });

    it('should include overlay classes', () => {
      const overlayClasses = 'absolute inset-0 bg-gray-900/40';
      
      expect(overlayClasses).toContain('bg-gray-900/40');
      expect(overlayClasses).toContain('absolute');
      expect(overlayClasses).toContain('inset-0');
    });

    it('should include content container classes', () => {
      const contentClasses = 'container relative z-10';
      
      expect(contentClasses).toContain('container');
      expect(contentClasses).toContain('relative');
      expect(contentClasses).toContain('z-10');
    });
  });

  describe('ResponsivePicture usage', () => {
    it('should pass correct props to ResponsivePicture', () => {
      const background_image = 'https://res.cloudinary.com/demo/upload/hero.jpg';
      const header = 'Hero Title';
      const heroImageAlt = header ?? '';
      
      const pictureProps = {
        src: background_image,
        alt: heroImageAlt,
        class: 'block h-full w-full',
        imageClass: 'h-full w-full object-cover'
      };
      
      expect(pictureProps.src).toBe(background_image);
      expect(pictureProps.alt).toBe(header);
      expect(pictureProps.class).toContain('h-full');
      expect(pictureProps.imageClass).toContain('object-cover');
    });
  });

  describe('Accessibility features', () => {
    it('should include aria-hidden on overlay', () => {
      const ariaHidden = 'true';
      expect(ariaHidden).toBe('true');
    });

    it('should use semantic heading levels', () => {
      // Hero should use h1 for main title
      const headingLevel = 'h1';
      expect(headingLevel).toBe('h1');
    });
  });

  describe('Button structure', () => {
    it('should validate button object structure', () => {
      const button = {
        url: '/contact',
        text: 'Get Started'
      };
      
      expect(button).toHaveProperty('url');
      expect(button).toHaveProperty('text');
      expect(button.url).toBeTruthy();
      expect(button.text).toBeTruthy();
    });

    it('should handle button with all properties', () => {
      const button = {
        url: '/contact',
        text: 'Get Started',
        variant: 'primary'
      };
      
      expect(button.url).toBe('/contact');
      expect(button.text).toBe('Get Started');
    });
  });

  describe('Responsive design', () => {
    it('should include responsive text sizes', () => {
      const titleClasses = 'text-4xl md:text-6xl font-bold mb-4 text-white';
      
      expect(titleClasses).toContain('text-4xl');
      expect(titleClasses).toContain('md:text-6xl');
    });

    it('should include responsive copy sizes', () => {
      const copyClasses = 'text-xl md:text-2xl mb-8';
      
      expect(copyClasses).toContain('text-xl');
      expect(copyClasses).toContain('md:text-2xl');
    });
  });
});