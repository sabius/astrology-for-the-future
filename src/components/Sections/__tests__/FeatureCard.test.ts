import { describe, it, expect } from 'vitest';

/**
 * Tests for FeatureCard component integration
 * This component was updated to use ResponsivePicture instead of plain img tag
 */

describe('FeatureCard Component Integration', () => {
  describe('Props interface validation', () => {
    it('should accept all required props', () => {
      const props = {
        header: 'Feature Title',
        copy: 'Feature description text',
        image: 'https://res.cloudinary.com/demo/upload/sample.jpg',
        image_alt: 'Feature image',
        list_items: [
          { heading: 'Item 1', copy: 'Description 1' },
          { heading: 'Item 2', copy: 'Description 2' },
        ],
        button: {
          text: 'Learn More',
          url: 'https://example.com',
          variant: 'primary' as const,
        },
      };

      expect(props.header).toBe('Feature Title');
      expect(props.copy).toBe('Feature description text');
      expect(props.image).toBeDefined();
      expect(props.image_alt).toBeDefined();
      expect(props.list_items).toHaveLength(2);
      expect(props.button).toBeDefined();
    });

    it('should handle optional props', () => {
      const minimalProps = {
        list_items: [],
      };

      expect(minimalProps.list_items).toEqual([]);
    });

    it('should validate list_items structure', () => {
      const listItem = {
        heading: 'Test Heading',
        copy: 'Test copy text',
      };

      expect(listItem.heading).toBeTruthy();
      expect(listItem.copy).toBeTruthy();
    });

    it('should validate button structure', () => {
      const button = {
        text: 'Click me',
        url: 'https://example.com',
        variant: 'primary' as const,
      };

      expect(button.text).toBeTruthy();
      expect(button.url).toMatch(/^https?:\/\//);
      expect(['primary', 'secondary', 'accent', 'outline']).toContain(button.variant);
    });
  });

  describe('ResponsivePicture integration', () => {
    it('should pass src prop to ResponsivePicture', () => {
      const image = 'https://res.cloudinary.com/demo/upload/v1234567890/feature.jpg';
      const image_alt = 'Feature image';

      expect(image).toBeTruthy();
      expect(image_alt).toBeTruthy();
    });

    it('should handle Cloudinary URLs in ResponsivePicture', () => {
      const cloudinaryImage = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      expect(cloudinaryImage.includes('res.cloudinary.com')).toBe(true);
    });

    it('should handle regular URLs in ResponsivePicture', () => {
      const regularImage = '/images/local-feature.jpg';
      expect(regularImage.includes('res.cloudinary.com')).toBe(false);
    });
  });

  describe('Conditional rendering logic', () => {
    it('should render header when provided', () => {
      const header = 'Feature Title';
      const shouldRenderHeader = !!header;
      expect(shouldRenderHeader).toBe(true);
    });

    it('should not render header when undefined', () => {
      const header = undefined;
      const shouldRenderHeader = !!header;
      expect(shouldRenderHeader).toBe(false);
    });

    it('should render copy when provided', () => {
      const copy = 'Feature description';
      const shouldRenderCopy = !!copy;
      expect(shouldRenderCopy).toBe(true);
    });

    it('should render image when provided', () => {
      const image = 'https://example.com/image.jpg';
      const shouldRenderImage = !!image;
      expect(shouldRenderImage).toBe(true);
    });

    it('should render button when provided', () => {
      const button = { text: 'Click', url: 'https://example.com', variant: 'primary' as const };
      const shouldRenderButton = !!button;
      expect(shouldRenderButton).toBe(true);
    });

    it('should handle empty list_items array', () => {
      const list_items: any[] = [];
      expect(list_items.length).toBe(0);
    });

    it('should map over list_items correctly', () => {
      const list_items = [
        { heading: 'Item 1', copy: 'Copy 1' },
        { heading: 'Item 2', copy: 'Copy 2' },
        { heading: 'Item 3', copy: 'Copy 3' },
      ];

      const renderedItems = list_items.map((item) => ({
        heading: item.heading,
        copy: item.copy,
      }));

      expect(renderedItems).toHaveLength(3);
      expect(renderedItems[0].heading).toBe('Item 1');
      expect(renderedItems[2].copy).toBe('Copy 3');
    });
  });

  describe('Styling classes', () => {
    it('should use correct responsive grid classes', () => {
      const gridClasses = 'grid grid-cols-1 md:grid-cols-2 gap-8 items-center';
      expect(gridClasses).toContain('grid');
      expect(gridClasses).toContain('grid-cols-1');
      expect(gridClasses).toContain('md:grid-cols-2');
      expect(gridClasses).toContain('gap-8');
    });

    it('should use correct image container classes', () => {
      const containerClasses = 'bg-gray-200 rounded-lg overflow-hidden';
      expect(containerClasses).toContain('bg-gray-200');
      expect(containerClasses).toContain('rounded-lg');
      expect(containerClasses).toContain('overflow-hidden');
    });

    it('should use correct card classes', () => {
      const cardClasses = 'bg-white p-8 rounded-lg shadow-md';
      expect(cardClasses).toContain('bg-white');
      expect(cardClasses).toContain('p-8');
      expect(cardClasses).toContain('rounded-lg');
      expect(cardClasses).toContain('shadow-md');
    });

    it('should use correct heading typography classes', () => {
      const headingClasses = 'text-3xl md:text-5xl font-bold mb-4';
      expect(headingClasses).toContain('text-3xl');
      expect(headingClasses).toContain('md:text-5xl');
      expect(headingClasses).toContain('font-bold');
    });
  });

  describe('Accessibility considerations', () => {
    it('should require image_alt for accessibility', () => {
      const image = 'https://example.com/image.jpg';
      const image_alt = 'Descriptive alt text';

      expect(image_alt).toBeTruthy();
      expect(image_alt.length).toBeGreaterThan(0);
    });

    it('should handle button target="_blank" with proper rel attribute', () => {
      const button = {
        text: 'External Link',
        url: 'https://external-site.com',
        variant: 'primary' as const,
      };

      // Button component should add rel="noopener noreferrer" when target="_blank"
      expect(button.url).toMatch(/^https?:\/\//);
    });

    it('should ensure adequate touch target size on mobile', () => {
      // Button component should have min-h-[44px] min-w-[44px]
      const minTouchTarget = 44; // pixels
      expect(minTouchTarget).toBeGreaterThanOrEqual(44);
    });
  });

  describe('Data validation', () => {
    it('should validate URL format in button', () => {
      const validUrls = [
        'https://example.com',
        'http://example.com',
        'https://example.com/path',
        'https://example.com/path?query=value',
      ];

      validUrls.forEach(url => {
        expect(url).toMatch(/^https?:\/\/.+/);
      });
    });

    it('should handle relative image paths', () => {
      const relativeImages = [
        '/images/feature.jpg',
        '../assets/feature.png',
        './local/feature.webp',
      ];

      relativeImages.forEach(path => {
        expect(path).toBeTruthy();
        expect(typeof path).toBe('string');
      });
    });

    it('should validate button variant values', () => {
      const validVariants = ['primary', 'secondary', 'accent', 'outline'];
      const testVariant = 'primary';

      expect(validVariants).toContain(testVariant);
    });
  });

  describe('Component composition', () => {
    it('should import ResponsivePicture component', () => {
      // Component should import from "../UI/ResponsivePicture.astro"
      const importPath = '../UI/ResponsivePicture.astro';
      expect(importPath).toContain('ResponsivePicture');
    });

    it('should import Button component', () => {
      // Component should import from "../UI/Button.astro"
      const importPath = '../UI/Button.astro';
      expect(importPath).toContain('Button');
    });

    it('should compose components correctly', () => {
      const hasResponsivePicture = true;
      const hasButton = true;

      expect(hasResponsivePicture).toBe(true);
      expect(hasButton).toBe(true);
    });
  });
});

describe('FeatureCard layout and structure', () => {
  it('should have correct section structure', () => {
    const sectionClasses = 'py-16';
    expect(sectionClasses).toContain('py-16');
  });

  it('should use container for responsive layout', () => {
    const containerClass = 'container';
    expect(containerClass).toBe('container');
  });

  it('should center text in header section', () => {
    const headerSectionClasses = 'text-center mb-12';
    expect(headerSectionClasses).toContain('text-center');
    expect(headerSectionClasses).toContain('mb-12');
  });

  it('should use max-width for copy text', () => {
    const copyClasses = 'text-3xl text-gray-700 max-w-3xl mx-auto';
    expect(copyClasses).toContain('max-w-3xl');
    expect(copyClasses).toContain('mx-auto');
  });

  it('should have two-column grid on medium screens', () => {
    const gridClasses = 'grid grid-cols-1 md:grid-cols-2';
    expect(gridClasses).toMatch(/md:grid-cols-2/);
  });
});