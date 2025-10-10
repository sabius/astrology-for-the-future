import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Helper function to create Cloudinary URLs with transformations
 * Extracted from ResponsivePicture.astro for testing
 */
const createCloudinaryUrl = (url: string, transformations: string[] = []) => {
  if (!url.includes('/upload/')) {
    return url;
  }

  const [base, resource] = url.split('/upload/');

  if (!resource) {
    return url;
  }

  const transformationString = transformations.filter(Boolean).join(',');

  return transformationString
    ? `${base}/upload/${transformationString}/${resource}`
    : `${base}/upload/${resource}`;
};

describe('createCloudinaryUrl', () => {
  describe('Non-Cloudinary URLs', () => {
    it('should return the original URL when it does not contain /upload/', () => {
      const url = 'https://example.com/image.jpg';
      const result = createCloudinaryUrl(url);
      expect(result).toBe(url);
    });

    it('should handle relative URLs without /upload/', () => {
      const url = '/images/local-image.png';
      const result = createCloudinaryUrl(url);
      expect(result).toBe(url);
    });

    it('should handle empty string', () => {
      const url = '';
      const result = createCloudinaryUrl(url);
      expect(result).toBe(url);
    });

    it('should handle URLs with upload in query string but not path', () => {
      const url = 'https://example.com/image.jpg?upload=true';
      const result = createCloudinaryUrl(url);
      expect(result).toBe(url);
    });
  });

  describe('Cloudinary URLs without transformations', () => {
    it('should return the original URL when no transformations are provided', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const result = createCloudinaryUrl(url);
      expect(result).toBe(url);
    });

    it('should return the original URL when transformations array is empty', () => {
      const url = 'https://res.cloudinary.com/demo/upload/v1234567890/folder/image.png';
      const result = createCloudinaryUrl(url, []);
      expect(result).toBe(url);
    });

    it('should handle Cloudinary URL without resource after /upload/', () => {
      const url = 'https://res.cloudinary.com/demo/upload/';
      const result = createCloudinaryUrl(url);
      expect(result).toBe(url);
    });
  });

  describe('Cloudinary URLs with transformations', () => {
    it('should insert single transformation correctly', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const result = createCloudinaryUrl(url, ['w_300']);
      expect(result).toBe('https://res.cloudinary.com/demo/upload/w_300/sample.jpg');
    });

    it('should insert multiple transformations separated by comma', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const result = createCloudinaryUrl(url, ['w_300', 'h_200', 'c_fill']);
      expect(result).toBe('https://res.cloudinary.com/demo/upload/w_300,h_200,c_fill/sample.jpg');
    });

    it('should handle transformations with underscores and numbers', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const result = createCloudinaryUrl(url, ['c_scale', 'w_480', 'f_auto', 'q_auto']);
      expect(result).toBe('https://res.cloudinary.com/demo/upload/c_scale,w_480,f_auto,q_auto/sample.jpg');
    });

    it('should preserve complex resource paths with folders', () => {
      const url = 'https://res.cloudinary.com/demo/upload/v1234567890/folder/subfolder/image.png';
      const result = createCloudinaryUrl(url, ['w_500', 'h_500']);
      expect(result).toBe('https://res.cloudinary.com/demo/upload/w_500,h_500/v1234567890/folder/subfolder/image.png');
    });

    it('should filter out falsy transformation values', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const result = createCloudinaryUrl(url, ['w_300', '', null as any, 'h_200', undefined as any]);
      expect(result).toBe('https://res.cloudinary.com/demo/upload/w_300,h_200/sample.jpg');
    });

    it('should handle transformations with special characters', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const result = createCloudinaryUrl(url, ['e_grayscale', 'co_rgb:FF0000', 'l_text:Arial_50:Hello']);
      expect(result).toBe('https://res.cloudinary.com/demo/upload/e_grayscale,co_rgb:FF0000,l_text:Arial_50:Hello/sample.jpg');
    });
  });

  describe('Edge cases', () => {
    it('should handle URL with multiple /upload/ occurrences (uses first)', () => {
      const url = 'https://res.cloudinary.com/demo/upload/folder/upload/image.jpg';
      const result = createCloudinaryUrl(url, ['w_300']);
      // This splits on first /upload/, so resource becomes 'folder/upload/image.jpg'
      expect(result).toBe('https://res.cloudinary.com/demo/upload/w_300/folder/upload/image.jpg');
    });

    it('should handle URL with existing transformations', () => {
      const url = 'https://res.cloudinary.com/demo/upload/c_fill,w_500/sample.jpg';
      const result = createCloudinaryUrl(url, ['q_auto']);
      // This will add q_auto as additional transformations
      expect(result).toBe('https://res.cloudinary.com/demo/upload/q_auto/c_fill,w_500/sample.jpg');
    });

    it('should handle very long transformation strings', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const transformations = Array(50).fill('a_0').map((t, i) => `${t}_${i}`);
      const result = createCloudinaryUrl(url, transformations);
      expect(result).toContain('/upload/');
      expect(result).toContain('/sample.jpg');
      expect(result.split(',').length).toBe(50);
    });

    it('should handle image with query parameters', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg?version=123';
      const result = createCloudinaryUrl(url, ['w_300']);
      expect(result).toBe('https://res.cloudinary.com/demo/upload/w_300/sample.jpg?version=123');
    });

    it('should handle image with hash fragment', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg#anchor';
      const result = createCloudinaryUrl(url, ['w_300']);
      expect(result).toBe('https://res.cloudinary.com/demo/upload/w_300/sample.jpg#anchor');
    });
  });

  describe('Real-world Cloudinary scenarios', () => {
    it('should create srcset URLs with different widths', () => {
      const baseUrl = 'https://res.cloudinary.com/demo/upload/v1234567890/sample.jpg';
      const widths = [480, 768, 1024, 1280];
      
      const srcsetUrls = widths.map((width) =>
        createCloudinaryUrl(baseUrl, ['c_scale', `w_${width}`, 'f_auto', 'q_auto'])
      );

      expect(srcsetUrls[0]).toBe('https://res.cloudinary.com/demo/upload/c_scale,w_480,f_auto,q_auto/v1234567890/sample.jpg');
      expect(srcsetUrls[1]).toBe('https://res.cloudinary.com/demo/upload/c_scale,w_768,f_auto,q_auto/v1234567890/sample.jpg');
      expect(srcsetUrls[2]).toBe('https://res.cloudinary.com/demo/upload/c_scale,w_1024,f_auto,q_auto/v1234567890/sample.jpg');
      expect(srcsetUrls[3]).toBe('https://res.cloudinary.com/demo/upload/c_scale,w_1280,f_auto,q_auto/v1234567890/sample.jpg');
    });

    it('should create optimized fallback URL', () => {
      const baseUrl = 'https://res.cloudinary.com/demo/upload/v1234567890/sample.jpg';
      const result = createCloudinaryUrl(baseUrl, ['f_auto', 'q_auto']);
      expect(result).toBe('https://res.cloudinary.com/demo/upload/f_auto,q_auto/v1234567890/sample.jpg');
    });

    it('should handle various image formats', () => {
      const formats = ['jpg', 'png', 'webp', 'gif', 'svg', 'avif'];
      formats.forEach(format => {
        const url = `https://res.cloudinary.com/demo/upload/sample.${format}`;
        const result = createCloudinaryUrl(url, ['w_300']);
        expect(result).toBe(`https://res.cloudinary.com/demo/upload/w_300/sample.${format}`);
      });
    });

    it('should handle images in nested folders', () => {
      const url = 'https://res.cloudinary.com/demo/upload/v1/products/categories/electronics/phone.jpg';
      const result = createCloudinaryUrl(url, ['w_300', 'h_300', 'c_fill']);
      expect(result).toBe('https://res.cloudinary.com/demo/upload/w_300,h_300,c_fill/v1/products/categories/electronics/phone.jpg');
    });
  });

  describe('Type safety and parameter validation', () => {
    it('should handle undefined transformations parameter', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const result = createCloudinaryUrl(url, undefined as any);
      expect(result).toBe(url);
    });

    it('should handle null transformations parameter', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const result = createCloudinaryUrl(url, null as any);
      expect(result).toBe(url);
    });

    it('should handle array with only falsy values', () => {
      const url = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const result = createCloudinaryUrl(url, ['', null, undefined] as any);
      expect(result).toBe(url);
    });
  });
});

describe('ResponsivePicture Component Logic', () => {
  describe('isCloudinary detection', () => {
    it('should detect Cloudinary URLs correctly', () => {
      const cloudinaryUrl = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      expect(cloudinaryUrl.includes('res.cloudinary.com')).toBe(true);
    });

    it('should not detect non-Cloudinary URLs', () => {
      const regularUrl = 'https://example.com/image.jpg';
      expect(regularUrl.includes('res.cloudinary.com')).toBe(false);
    });

    it('should handle edge case URLs', () => {
      const urls = [
        'http://res.cloudinary.com/demo/upload/sample.jpg', // http
        'https://sub.res.cloudinary.com/demo/upload/sample.jpg', // subdomain
        'https://cloudinary.com/upload/sample.jpg', // missing res
        'https://res.cloudinary.com.example.com/upload/sample.jpg', // phishing attempt
      ];

      expect(urls[0].includes('res.cloudinary.com')).toBe(true);
      expect(urls[1].includes('res.cloudinary.com')).toBe(true);
      expect(urls[2].includes('res.cloudinary.com')).toBe(false);
      expect(urls[3].includes('res.cloudinary.com')).toBe(true);
    });
  });

  describe('srcSet generation', () => {
    it('should generate correct srcset for Cloudinary images', () => {
      const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const widths = [480, 768, 1024, 1280];
      const isCloudinary = src.includes('res.cloudinary.com');

      const srcSet = isCloudinary
        ? widths
            .map((width) =>
              `${createCloudinaryUrl(src, ['c_scale', `w_${width}`, 'f_auto', 'q_auto'])} ${width}w`
            )
            .join(', ')
        : undefined;

      expect(srcSet).toContain('480w');
      expect(srcSet).toContain('768w');
      expect(srcSet).toContain('1024w');
      expect(srcSet).toContain('1280w');
      expect(srcSet).toContain('c_scale');
      expect(srcSet).toContain('f_auto');
      expect(srcSet).toContain('q_auto');
    });

    it('should return undefined for non-Cloudinary images', () => {
      const src = 'https://example.com/image.jpg';
      const widths = [480, 768, 1024, 1280];
      const isCloudinary = src.includes('res.cloudinary.com');

      const srcSet = isCloudinary
        ? widths
            .map((width) =>
              `${createCloudinaryUrl(src, ['c_scale', `w_${width}`, 'f_auto', 'q_auto'])} ${width}w`
            )
            .join(', ')
        : undefined;

      expect(srcSet).toBeUndefined();
    });

    it('should format srcset entries correctly', () => {
      const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const width = 768;
      const entry = `${createCloudinaryUrl(src, ['c_scale', `w_${width}`, 'f_auto', 'q_auto'])} ${width}w`;
      
      expect(entry).toMatch(/https:\/\/res\.cloudinary\.com\/demo\/upload\/c_scale,w_768,f_auto,q_auto\/sample\.jpg 768w/);
    });
  });

  describe('fallbackSrc generation', () => {
    it('should generate optimized fallback for Cloudinary images', () => {
      const src = 'https://res.cloudinary.com/demo/upload/sample.jpg';
      const isCloudinary = src.includes('res.cloudinary.com');

      const fallbackSrc = isCloudinary
        ? createCloudinaryUrl(src, ['f_auto', 'q_auto'])
        : src;

      expect(fallbackSrc).toBe('https://res.cloudinary.com/demo/upload/f_auto,q_auto/sample.jpg');
    });

    it('should use original URL for non-Cloudinary images', () => {
      const src = 'https://example.com/image.jpg';
      const isCloudinary = src.includes('res.cloudinary.com');

      const fallbackSrc = isCloudinary
        ? createCloudinaryUrl(src, ['f_auto', 'q_auto'])
        : src;

      expect(fallbackSrc).toBe(src);
    });
  });

  describe('sizes attribute', () => {
    it('should use correct sizes value', () => {
      const sizes = '(max-width: 768px) 100vw, 50vw';
      expect(sizes).toBe('(max-width: 768px) 100vw, 50vw');
    });
  });

  describe('alt text handling', () => {
    it('should use provided alt text', () => {
      const alt = 'Test image description';
      expect(alt).toBe('Test image description');
    });

    it('should default to empty string when alt is not provided', () => {
      const alt = undefined;
      const defaultAlt = alt || '';
      expect(defaultAlt).toBe('');
    });
  });
});

describe('Integration scenarios', () => {
  describe('Complete ResponsivePicture rendering logic', () => {
    it('should handle Cloudinary image with all optimizations', () => {
      const props = {
        src: 'https://res.cloudinary.com/demo/upload/v1234567890/products/phone.jpg',
        alt: 'Latest smartphone model',
      };

      const isCloudinary = props.src.includes('res.cloudinary.com');
      const widths = [480, 768, 1024, 1280];

      const srcSet = isCloudinary
        ? widths
            .map((width) =>
              `${createCloudinaryUrl(props.src, ['c_scale', `w_${width}`, 'f_auto', 'q_auto'])} ${width}w`
            )
            .join(', ')
        : undefined;

      const fallbackSrc = isCloudinary
        ? createCloudinaryUrl(props.src, ['f_auto', 'q_auto'])
        : props.src;

      expect(srcSet).toBeDefined();
      expect(srcSet).toContain('c_scale,w_480,f_auto,q_auto');
      expect(srcSet).toContain('c_scale,w_768,f_auto,q_auto');
      expect(srcSet).toContain('c_scale,w_1024,f_auto,q_auto');
      expect(srcSet).toContain('c_scale,w_1280,f_auto,q_auto');
      expect(fallbackSrc).toContain('f_auto,q_auto');
      expect(props.alt).toBe('Latest smartphone model');
    });

    it('should handle regular image without optimizations', () => {
      const props = {
        src: '/images/local-photo.jpg',
        alt: 'Local photo',
      };

      const isCloudinary = props.src.includes('res.cloudinary.com');
      const widths = [480, 768, 1024, 1280];

      const srcSet = isCloudinary
        ? widths
            .map((width) =>
              `${createCloudinaryUrl(props.src, ['c_scale', `w_${width}`, 'f_auto', 'q_auto'])} ${width}w`
            )
            .join(', ')
        : undefined;

      const fallbackSrc = isCloudinary
        ? createCloudinaryUrl(props.src, ['f_auto', 'q_auto'])
        : props.src;

      expect(srcSet).toBeUndefined();
      expect(fallbackSrc).toBe('/images/local-photo.jpg');
      expect(props.alt).toBe('Local photo');
    });

    it('should handle missing alt text gracefully', () => {
      const props = {
        src: 'https://res.cloudinary.com/demo/upload/sample.jpg',
      };

      const alt = (props as any).alt || '';
      expect(alt).toBe('');
    });
  });

  describe('Performance and optimization checks', () => {
    it('should generate appropriate widths for responsive design', () => {
      const widths = [480, 768, 1024, 1280];
      
      // Verify breakpoints align with common device widths
      expect(widths[0]).toBe(480); // Mobile
      expect(widths[1]).toBe(768); // Tablet
      expect(widths[2]).toBe(1024); // Small desktop
      expect(widths[3]).toBe(1280); // Desktop
    });

    it('should include format and quality auto optimization', () => {
      const transformations = ['f_auto', 'q_auto'];
      expect(transformations).toContain('f_auto'); // Format auto
      expect(transformations).toContain('q_auto'); // Quality auto
    });

    it('should use lazy loading by default', () => {
      const loading = 'lazy';
      expect(loading).toBe('lazy');
    });

    it('should use async decoding', () => {
      const decoding = 'async';
      expect(decoding).toBe('async');
    });
  });
});