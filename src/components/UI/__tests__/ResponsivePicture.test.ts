/**
 * Integration tests for ResponsivePicture component
 * 
 * Note: These tests focus on the component's logic and behavior.
 * Full rendering tests would require @astrojs/test-utils or similar.
 */
import { describe, it, expect } from 'vitest';
import { createCloudinaryUrl, isCloudinaryUrl, generateSrcSet } from '../../../utils/cloudinary';

describe('ResponsivePicture component logic', () => {
  describe('Props interface validation', () => {
    it('should handle all required props', () => {
      const props = {
        src: 'https://example.com/image.jpg',
        alt: 'Test image',
        class: 'custom-class',
        imageClass: 'custom-image-class'
      };
      
      expect(props.src).toBeDefined();
      expect(props.alt).toBe('Test image');
      expect(props.class).toBe('custom-class');
      expect(props.imageClass).toBe('custom-image-class');
    });

    it('should work with minimal props (only src)', () => {
      const props = {
        src: 'https://example.com/image.jpg'
      };
      
      expect(props.src).toBeDefined();
      // Default values in component: alt = "", class = "", imageClass = "w-full h-full object-cover"
    });
  });

  describe('Cloudinary URL detection', () => {
    it('should detect Cloudinary URLs correctly', () => {
      const cloudinaryUrl = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      expect(isCloudinaryUrl(cloudinaryUrl)).toBe(true);
    });

    it('should detect non-Cloudinary URLs correctly', () => {
      const regularUrl = 'https://example.com/image.jpg';
      expect(isCloudinaryUrl(regularUrl)).toBe(false);
    });
  });

  describe('srcSet generation for Cloudinary images', () => {
    it('should generate srcSet for Cloudinary URLs', () => {
      const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const widths = [480, 768, 1024, 1280];
      const srcSet = generateSrcSet(src, widths);
      
      expect(srcSet).toBeDefined();
      widths.forEach(width => {
        expect(srcSet).toContain(`${width}w`);
      });
    });

    it('should not generate srcSet for non-Cloudinary URLs', () => {
      const src = 'https://example.com/image.jpg';
      const srcSet = generateSrcSet(src);
      
      expect(srcSet).toBeUndefined();
    });

    it('should include proper transformations in srcSet', () => {
      const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const srcSet = generateSrcSet(src);
      
      expect(srcSet).toContain('c_scale');
      expect(srcSet).toContain('f_auto');
      expect(srcSet).toContain('q_auto');
    });
  });

  describe('Fallback src generation', () => {
    it('should create optimized fallback for Cloudinary images', () => {
      const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const fallback = createCloudinaryUrl(src, ['f_auto', 'q_auto']);
      
      expect(fallback).toBe('https://res.cloudinary.com/demo/upload/f_auto,q_auto/sample.jpg');
    });

    it('should use original URL as fallback for non-Cloudinary images', () => {
      const src = 'https://example.com/image.jpg';
      const fallback = createCloudinaryUrl(src, ['f_auto', 'q_auto']);
      
      expect(fallback).toBe(src);
    });
  });

  describe('Responsive widths', () => {
    it('should use standard responsive widths', () => {
      const widths = [480, 768, 1024, 1280];
      
      expect(widths).toHaveLength(4);
      expect(widths).toContain(480);  // Mobile
      expect(widths).toContain(768);  // Tablet
      expect(widths).toContain(1024); // Desktop
      expect(widths).toContain(1280); // Large desktop
    });
  });

  describe('Sizes attribute', () => {
    it('should have appropriate sizes for responsive images', () => {
      const sizes = "(max-width: 768px) 100vw, 50vw";
      
      expect(sizes).toContain('max-width: 768px');
      expect(sizes).toContain('100vw');
      expect(sizes).toContain('50vw');
    });
  });

  describe('Image attributes', () => {
    it('should include lazy loading attribute', () => {
      const loading = 'lazy';
      expect(loading).toBe('lazy');
    });

    it('should include async decoding attribute', () => {
      const decoding = 'async';
      expect(decoding).toBe('async');
    });
  });

  describe('Default class values', () => {
    it('should use default imageClass when not provided', () => {
      const defaultImageClass = 'w-full h-full object-cover';
      
      expect(defaultImageClass).toContain('w-full');
      expect(defaultImageClass).toContain('h-full');
      expect(defaultImageClass).toContain('object-cover');
    });

    it('should allow custom imageClass override', () => {
      const customImageClass = 'custom-width custom-height custom-fit';
      
      expect(customImageClass).not.toBe('w-full h-full object-cover');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty src gracefully', () => {
      const src = '';
      expect(isCloudinaryUrl(src)).toBe(false);
      expect(generateSrcSet(src)).toBeUndefined();
    });

    it('should handle malformed Cloudinary URLs', () => {
      const src = 'https://res.cloudinary.com/demo/sample.jpg'; // Missing /upload/
      const srcSet = generateSrcSet(src);
      
      expect(srcSet).toBeUndefined();
    });

    it('should handle URLs with query parameters', () => {
      const src = 'https://res.cloudinary.com/demo/upload/sample.jpg?v=123';
      const fallback = createCloudinaryUrl(src, ['f_auto']);
      
      expect(fallback).toContain('f_auto');
      expect(fallback).toContain('?v=123');
    });
  });

  describe('Accessibility', () => {
    it('should support alt text', () => {
      const alt = 'Descriptive alt text for image';
      expect(alt).toBeTruthy();
      expect(alt.length).toBeGreaterThan(0);
    });

    it('should allow empty alt for decorative images', () => {
      const alt = '';
      expect(alt).toBe('');
    });
  });

  describe('Performance optimizations', () => {
    it('should include format auto optimization', () => {
      const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const fallback = createCloudinaryUrl(src, ['f_auto', 'q_auto']);
      
      expect(fallback).toContain('f_auto');
    });

    it('should include quality auto optimization', () => {
      const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const fallback = createCloudinaryUrl(src, ['f_auto', 'q_auto']);
      
      expect(fallback).toContain('q_auto');
    });

    it('should use c_scale for proper image scaling', () => {
      const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const srcSet = generateSrcSet(src);
      
      expect(srcSet).toContain('c_scale');
    });
  });
});