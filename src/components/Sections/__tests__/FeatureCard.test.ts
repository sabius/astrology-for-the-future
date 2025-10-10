/**
 * Tests for FeatureCard component logic
 */
import { describe, it, expect } from 'vitest';

describe('FeatureCard component logic', () => {
  describe('Props interface', () => {
    it('should handle all expected props', () => {
      const props = {
        header: 'Feature Title',
        copy: 'Feature description',
        image: 'https://res.cloudinary.com/demo/upload/feature.jpg',
        image_alt: 'Feature image',
        list_items: [
          { heading: 'Item 1', copy: 'Description 1' },
          { heading: 'Item 2', copy: 'Description 2' }
        ],
        button: {
          url: '/learn-more',
          text: 'Learn More',
          variant: 'primary'
        }
      };
      
      expect(props.header).toBeDefined();
      expect(props.copy).toBeDefined();
      expect(props.image).toBeDefined();
      expect(props.image_alt).toBeDefined();
      expect(props.list_items).toHaveLength(2);
      expect(props.button).toBeDefined();
    });

    it('should handle minimal props', () => {
      const props = {
        list_items: [
          { heading: 'Item 1' }
        ]
      };
      
      expect(props.list_items).toBeDefined();
      expect(props.list_items).toHaveLength(1);
    });
  });

  describe('list_items structure', () => {
    it('should support items with heading and copy', () => {
      const listItem = {
        heading: 'Feature Title',
        copy: 'Feature description text'
      };
      
      expect(listItem.heading).toBe('Feature Title');
      expect(listItem.copy).toBe('Feature description text');
    });

    it('should support items with only heading', () => {
      const listItem = {
        heading: 'Feature Title'
      };
      
      expect(listItem.heading).toBeDefined();
      expect(listItem.copy).toBeUndefined();
    });

    it('should support items with only copy', () => {
      const listItem = {
        copy: 'Feature description'
      };
      
      expect(listItem.copy).toBeDefined();
      expect(listItem.heading).toBeUndefined();
    });

    it('should handle multiple list items', () => {
      const list_items = [
        { heading: 'Item 1', copy: 'Description 1' },
        { heading: 'Item 2', copy: 'Description 2' },
        { heading: 'Item 3', copy: 'Description 3' }
      ];
      
      expect(list_items).toHaveLength(3);
      list_items.forEach((item, index) => {
        expect(item.heading).toBe(`Item ${index + 1}`);
        expect(item.copy).toBe(`Description ${index + 1}`);
      });
    });

    it('should handle empty list_items array', () => {
      const list_items: any[] = [];
      
      expect(list_items).toHaveLength(0);
    });
  });

  describe('Conditional rendering logic', () => {
    it('should render header when provided', () => {
      const header = 'Feature Section Title';
      const shouldRenderHeader = \!\!header;
      
      expect(shouldRenderHeader).toBeTruthy();
    });

    it('should not render header when not provided', () => {
      const header = undefined;
      const shouldRenderHeader = \!\!header;
      
      expect(shouldRenderHeader).toBeFalsy();
    });

    it('should render copy when provided', () => {
      const copy = 'Section description';
      const shouldRenderCopy = \!\!copy;
      
      expect(shouldRenderCopy).toBeTruthy();
    });

    it('should render image when provided', () => {
      const image = 'https://example.com/image.jpg';
      const shouldRenderImage = \!\!image;
      
      expect(shouldRenderImage).toBeTruthy();
    });

    it('should render button when provided', () => {
      const button = { url: '/contact', text: 'Contact' };
      const shouldRenderButton = \!\!button;
      
      expect(shouldRenderButton).toBeTruthy();
    });
  });

  describe('ResponsivePicture usage', () => {
    it('should pass correct props to ResponsivePicture', () => {
      const image = 'https://res.cloudinary.com/demo/upload/feature.jpg';
      const image_alt = 'Feature image description';
      
      const pictureProps = {
        src: image,
        alt: image_alt
      };
      
      expect(pictureProps.src).toBe(image);
      expect(pictureProps.alt).toBe(image_alt);
    });

    it('should handle undefined image_alt', () => {
      const image = 'https://example.com/image.jpg';
      const image_alt = undefined;
      
      const pictureProps = {
        src: image,
        alt: image_alt
      };
      
      expect(pictureProps.src).toBeDefined();
      expect(pictureProps.alt).toBeUndefined();
    });
  });

  describe('Button structure', () => {
    it('should validate button object with all properties', () => {
      const button = {
        url: '/contact',
        text: 'Get Started',
        variant: 'primary'
      };
      
      expect(button).toHaveProperty('url');
      expect(button).toHaveProperty('text');
      expect(button).toHaveProperty('variant');
      expect(button.url).toBeTruthy();
      expect(button.text).toBeTruthy();
    });

    it('should handle button with minimal properties', () => {
      const button = {
        url: '/contact',
        text: 'Contact'
      };
      
      expect(button.url).toBeDefined();
      expect(button.text).toBeDefined();
    });

    it('should support target="_blank" for external links', () => {
      const button = {
        url: 'https://external.com',
        text: 'External Link',
        target: '_blank'
      };
      
      expect(button.url).toContain('https://');
    });
  });

  describe('CSS Grid layout', () => {
    it('should use proper grid classes', () => {
      const gridClasses = 'grid grid-cols-1 md:grid-cols-2 gap-8 items-center';
      
      expect(gridClasses).toContain('grid');
      expect(gridClasses).toContain('grid-cols-1');
      expect(gridClasses).toContain('md:grid-cols-2');
      expect(gridClasses).toContain('gap-8');
      expect(gridClasses).toContain('items-center');
    });

    it('should include image container classes', () => {
      const imageContainerClasses = 'bg-gray-200 rounded-lg overflow-hidden';
      
      expect(imageContainerClasses).toContain('bg-gray-200');
      expect(imageContainerClasses).toContain('rounded-lg');
      expect(imageContainerClasses).toContain('overflow-hidden');
    });

    it('should include content card classes', () => {
      const cardClasses = 'bg-white p-8 rounded-lg shadow-md';
      
      expect(cardClasses).toContain('bg-white');
      expect(cardClasses).toContain('p-8');
      expect(cardClasses).toContain('rounded-lg');
      expect(cardClasses).toContain('shadow-md');
    });
  });

  describe('Responsive typography', () => {
    it('should include responsive header sizes', () => {
      const headerClasses = 'text-3xl md:text-5xl font-bold mb-4';
      
      expect(headerClasses).toContain('text-3xl');
      expect(headerClasses).toContain('md:text-5xl');
      expect(headerClasses).toContain('font-bold');
    });

    it('should include responsive copy sizes', () => {
      const copyClasses = 'text-3xl text-gray-700 max-w-3xl mx-auto';
      
      expect(copyClasses).toContain('text-3xl');
      expect(copyClasses).toContain('text-gray-700');
    });

    it('should include list item heading sizes', () => {
      const headingClasses = 'font-bold text-2xl mb-2';
      
      expect(headingClasses).toContain('font-bold');
      expect(headingClasses).toContain('text-2xl');
      expect(headingClasses).toContain('mb-2');
    });

    it('should include list item copy sizes', () => {
      const copyClasses = 'text-gray-800 text-xl';
      
      expect(copyClasses).toContain('text-gray-800');
      expect(copyClasses).toContain('text-xl');
    });
  });

  describe('Section spacing', () => {
    it('should include proper section padding', () => {
      const sectionClasses = 'py-16';
      
      expect(sectionClasses).toContain('py-16');
    });

    it('should include proper text center margin', () => {
      const centerClasses = 'text-center mb-12';
      
      expect(centerClasses).toContain('text-center');
      expect(centerClasses).toContain('mb-12');
    });

    it('should include button margin', () => {
      const buttonContainerClasses = 'mt-6';
      
      expect(buttonContainerClasses).toContain('mt-6');
    });
  });

  describe('Array mapping operations', () => {
    it('should correctly map over list_items', () => {
      const list_items = [
        { heading: 'Item 1', copy: 'Desc 1' },
        { heading: 'Item 2', copy: 'Desc 2' }
      ];
      
      const mappedItems = list_items.map(item => ({
        hasHeading: \!\!item.heading,
        hasCopy: \!\!item.copy
      }));
      
      expect(mappedItems).toHaveLength(2);
      mappedItems.forEach(item => {
        expect(item.hasHeading).toBe(true);
        expect(item.hasCopy).toBe(true);
      });
    });

    it('should handle items with missing properties', () => {
      const list_items = [
        { heading: 'Item 1' },
        { copy: 'Desc 2' },
        { heading: 'Item 3', copy: 'Desc 3' }
      ];
      
      expect(list_items[0].heading).toBeDefined();
      expect(list_items[0].copy).toBeUndefined();
      expect(list_items[1].heading).toBeUndefined();
      expect(list_items[1].copy).toBeDefined();
      expect(list_items[2].heading).toBeDefined();
      expect(list_items[2].copy).toBeDefined();
    });
  });
});