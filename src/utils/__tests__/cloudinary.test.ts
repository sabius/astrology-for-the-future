import { describe, it, expect } from 'vitest';
import { createCloudinaryUrl, isCloudinaryUrl, generateSrcSet } from '../cloudinary';

describe('cloudinary utility functions', () => {
  describe('createCloudinaryUrl', () => {
    describe('happy path', () => {
      it('should add transformations to a valid Cloudinary URL', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const transformations = ['c_scale', 'w_480', 'f_auto', 'q_auto'];
        const expected = 'https://res.cloudinary.com/demo/upload/c_scale,w_480,f_auto,q_auto/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should handle URLs with existing path segments', () => {
        const url = 'https://res.cloudinary.com/mycloud/upload/v1234567/folder/image.png';
        const transformations = ['w_800'];
        const expected = 'https://res.cloudinary.com/mycloud/upload/w_800/v1234567/folder/image.png';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should handle URLs with query parameters', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg?foo=bar';
        const transformations = ['f_auto'];
        const expected = 'https://res.cloudinary.com/demo/upload/f_auto/sample.jpg?foo=bar';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should return original URL when no transformations are provided', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        
        expect(createCloudinaryUrl(url, [])).toBe(url);
      });

      it('should handle empty transformation array', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        
        expect(createCloudinaryUrl(url)).toBe(url);
      });
    });

    describe('edge cases', () => {
      it('should return original URL for non-Cloudinary URLs', () => {
        const url = 'https://example.com/image.jpg';
        const transformations = ['w_480'];
        
        expect(createCloudinaryUrl(url, transformations)).toBe(url);
      });

      it('should handle URL without /upload/ segment', () => {
        const url = 'https://res.cloudinary.com/demo/image.jpg';
        const transformations = ['w_480'];
        
        expect(createCloudinaryUrl(url, transformations)).toBe(url);
      });

      it('should handle URL ending with /upload/', () => {
        const url = 'https://res.cloudinary.com/demo/upload/';
        const transformations = ['w_480'];
        
        expect(createCloudinaryUrl(url, transformations)).toBe(url);
      });

      it('should filter out empty/falsy transformations', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const transformations = ['c_scale', '', 'w_480', null as any, undefined as any, 'f_auto'];
        const expected = 'https://res.cloudinary.com/demo/upload/c_scale,w_480,f_auto/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should handle multiple /upload/ segments (use first one)', () => {
        const url = 'https://res.cloudinary.com/demo/upload/folder/upload/sample.jpg';
        const transformations = ['w_480'];
        const expected = 'https://res.cloudinary.com/demo/upload/w_480/folder/upload/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should handle empty string URL', () => {
        const url = '';
        const transformations = ['w_480'];
        
        expect(createCloudinaryUrl(url, transformations)).toBe('');
      });

      it('should handle single transformation', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const transformations = ['w_480'];
        const expected = 'https://res.cloudinary.com/demo/upload/w_480/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should handle many transformations', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const transformations = ['c_scale', 'w_480', 'h_320', 'f_auto', 'q_auto', 'dpr_2.0'];
        const expected = 'https://res.cloudinary.com/demo/upload/c_scale,w_480,h_320,f_auto,q_auto,dpr_2.0/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });
    });

    describe('different URL formats', () => {
      it('should handle HTTP URLs', () => {
        const url = 'http://res.cloudinary.com/demo/upload/sample.jpg';
        const transformations = ['w_480'];
        const expected = 'http://res.cloudinary.com/demo/upload/w_480/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should handle URLs with different file extensions', () => {
        const extensions = ['jpg', 'png', 'gif', 'webp', 'svg', 'avif'];
        
        extensions.forEach(ext => {
          const url = `https://res.cloudinary.com/demo/upload/sample.${ext}`;
          const transformations = ['w_480'];
          const expected = `https://res.cloudinary.com/demo/upload/w_480/sample.${ext}`;
          
          expect(createCloudinaryUrl(url, transformations)).toBe(expected);
        });
      });

      it('should handle URLs with version numbers', () => {
        const url = 'https://res.cloudinary.com/demo/upload/v1234567890/sample.jpg';
        const transformations = ['w_480'];
        const expected = 'https://res.cloudinary.com/demo/upload/w_480/v1234567890/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should handle URLs with nested folders', () => {
        const url = 'https://res.cloudinary.com/demo/upload/folder/subfolder/sample.jpg';
        const transformations = ['w_480'];
        const expected = 'https://res.cloudinary.com/demo/upload/w_480/folder/subfolder/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });
    });

    describe('transformation formats', () => {
      it('should handle scale transformations', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const transformations = ['c_scale', 'w_800'];
        const expected = 'https://res.cloudinary.com/demo/upload/c_scale,w_800/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should handle format transformations', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const transformations = ['f_auto'];
        const expected = 'https://res.cloudinary.com/demo/upload/f_auto/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should handle quality transformations', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const transformations = ['q_auto'];
        const expected = 'https://res.cloudinary.com/demo/upload/q_auto/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });

      it('should handle crop transformations', () => {
        const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const transformations = ['c_fill', 'w_800', 'h_600'];
        const expected = 'https://res.cloudinary.com/demo/upload/c_fill,w_800,h_600/sample.jpg';
        
        expect(createCloudinaryUrl(url, transformations)).toBe(expected);
      });
    });
  });

  describe('isCloudinaryUrl', () => {
    describe('happy path', () => {
      it('should return true for valid Cloudinary URLs', () => {
        expect(isCloudinaryUrl('https://res.cloudinary.com/demo/upload/sample.jpg')).toBe(true);
      });

      it('should return true for HTTP Cloudinary URLs', () => {
        expect(isCloudinaryUrl('http://res.cloudinary.com/demo/upload/sample.jpg')).toBe(true);
      });

      it('should return true for Cloudinary URLs with paths', () => {
        expect(isCloudinaryUrl('https://res.cloudinary.com/mycloud/image/upload/v1/sample.jpg')).toBe(true);
      });
    });

    describe('edge cases', () => {
      it('should return false for non-Cloudinary URLs', () => {
        expect(isCloudinaryUrl('https://example.com/image.jpg')).toBe(false);
      });

      it('should return false for empty strings', () => {
        expect(isCloudinaryUrl('')).toBe(false);
      });

      it('should return false for URLs containing "cloudinary" but not res.cloudinary.com', () => {
        expect(isCloudinaryUrl('https://cloudinary.example.com/image.jpg')).toBe(false);
      });

      it('should be case-sensitive', () => {
        expect(isCloudinaryUrl('https://RES.CLOUDINARY.COM/demo/upload/sample.jpg')).toBe(false);
      });

      it('should return true for subdomains of cloudinary.com', () => {
        expect(isCloudinaryUrl('https://res.cloudinary.com.au/demo/sample.jpg')).toBe(true);
      });
    });
  });

  describe('generateSrcSet', () => {
    describe('happy path', () => {
      it('should generate srcset for Cloudinary URLs with default widths', () => {
        const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const result = generateSrcSet(src);
        
        expect(result).toBeDefined();
        expect(result).toContain('480w');
        expect(result).toContain('768w');
        expect(result).toContain('1024w');
        expect(result).toContain('1280w');
        expect(result).toContain('c_scale');
        expect(result).toContain('f_auto');
        expect(result).toContain('q_auto');
      });

      it('should generate srcset with custom widths', () => {
        const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const widths = [320, 640, 960];
        const result = generateSrcSet(src, widths);
        
        expect(result).toContain('320w');
        expect(result).toContain('640w');
        expect(result).toContain('960w');
        expect(result).not.toContain('480w');
      });

      it('should generate srcset with custom transformations', () => {
        const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const widths = [480, 768];
        const transformations = ['f_webp', 'q_80'];
        const result = generateSrcSet(src, widths, transformations);
        
        expect(result).toContain('f_webp');
        expect(result).toContain('q_80');
        expect(result).not.toContain('f_auto');
        expect(result).not.toContain('q_auto');
      });

      it('should format srcset correctly with commas and spaces', () => {
        const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const widths = [480, 768];
        const result = generateSrcSet(src, widths);
        
        expect(result).toMatch(/\d+w, .+\d+w$/);
      });

      it('should include width descriptors in srcset', () => {
        const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const result = generateSrcSet(src);
        
        expect(result).toContain(' 480w');
        expect(result).toContain(' 768w');
        expect(result).toContain(' 1024w');
        expect(result).toContain(' 1280w');
      });
    });

    describe('edge cases', () => {
      it('should return undefined for non-Cloudinary URLs', () => {
        const src = 'https://example.com/image.jpg';
        const result = generateSrcSet(src);
        
        expect(result).toBeUndefined();
      });

      it('should handle single width', () => {
        const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const widths = [480];
        const result = generateSrcSet(src, widths);
        
        expect(result).toBe('https://res.cloudinary.com/demo/upload/c_scale,w_480,f_auto,q_auto/sample.jpg 480w');
      });

      it('should handle empty widths array', () => {
        const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const widths: number[] = [];
        const result = generateSrcSet(src, widths);
        
        expect(result).toBe('');
      });

      it('should handle empty transformations array', () => {
        const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const widths = [480];
        const transformations: string[] = [];
        const result = generateSrcSet(src, widths, transformations);
        
        expect(result).toContain('c_scale,w_480/');
      });

      it('should maintain URL structure for complex paths', () => {
        const src = 'https://res.cloudinary.com/demo/upload/v123/folder/sample.jpg';
        const widths = [480];
        const result = generateSrcSet(src, widths);
        
        expect(result).toContain('v123/folder/sample.jpg');
      });
    });

    describe('transformation ordering', () => {
      it('should place c_scale before width', () => {
        const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const widths = [480];
        const result = generateSrcSet(src, widths);
        
        expect(result).toMatch(/c_scale,w_\d+/);
      });

      it('should append additional transformations after width', () => {
        const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
        const widths = [480];
        const transformations = ['f_auto', 'q_auto'];
        const result = generateSrcSet(src, widths, transformations);
        
        expect(result).toMatch(/w_\d+,f_auto,q_auto/);
      });
    });

    describe('real-world scenarios', () => {
      it('should generate srcset for responsive hero images', () => {
        const src = 'https://res.cloudinary.com/demo/upload/hero-bg.jpg';
        const widths = [640, 828, 1200, 1920];
        const result = generateSrcSet(src, widths);
        
        expect(result).toContain('640w');
        expect(result).toContain('828w');
        expect(result).toContain('1200w');
        expect(result).toContain('1920w');
      });

      it('should generate srcset for product images with custom quality', () => {
        const src = 'https://res.cloudinary.com/shop/upload/products/item.jpg';
        const widths = [300, 600, 900];
        const transformations = ['f_auto', 'q_90'];
        const result = generateSrcSet(src, widths, transformations);
        
        expect(result).toContain('q_90');
        expect(result).toContain('300w');
        expect(result).toContain('600w');
        expect(result).toContain('900w');
      });
    });
  });

  describe('integration scenarios', () => {
    it('should work together to create responsive images', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      
      // Check if it's a Cloudinary URL
      expect(isCloudinaryUrl(url)).toBe(true);
      
      // Generate srcset
      const srcSet = generateSrcSet(url, [480, 768]);
      expect(srcSet).toBeDefined();
      
      // Create fallback URL
      const fallback = createCloudinaryUrl(url, ['f_auto', 'q_auto']);
      expect(fallback).toBe('https://res.cloudinary.com/demo/upload/f_auto,q_auto/sample.jpg');
    });

    it('should handle non-Cloudinary URLs gracefully', () => {
      const url = 'https://example.com/image.jpg';
      
      expect(isCloudinaryUrl(url)).toBe(false);
      expect(generateSrcSet(url)).toBeUndefined();
      expect(createCloudinaryUrl(url, ['w_480'])).toBe(url);
    });
  });
});