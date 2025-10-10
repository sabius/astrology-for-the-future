/**
 * Creates a Cloudinary URL with the specified transformations.
 * 
 * @param url - The original Cloudinary URL
 * @param transformations - Array of transformation strings (e.g., ["c_scale", "w_480", "f_auto"])
 * @returns The transformed URL or the original URL if not a Cloudinary URL
 * 
 * @example
 * createCloudinaryUrl(
 *   "https://res.cloudinary.com/demo/upload/sample.jpg",
 *   ["c_scale", "w_480", "f_auto", "q_auto"]
 * )
 * // Returns: "https://res.cloudinary.com/demo/upload/c_scale,w_480,f_auto,q_auto/sample.jpg"
 */
export const createCloudinaryUrl = (url: string, transformations: string[] = []): string => {
  if (\!url.includes("/upload/")) {
    return url;
  }

  const [base, resource] = url.split("/upload/");

  if (\!resource) {
    return url;
  }

  const transformationString = transformations.filter(Boolean).join(",");

  return transformationString
    ? `${base}/upload/${transformationString}/${resource}`
    : `${base}/upload/${resource}`;
};

/**
 * Checks if a URL is a Cloudinary URL
 * 
 * @param url - The URL to check
 * @returns True if the URL is a Cloudinary URL
 */
export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes("res.cloudinary.com");
};

/**
 * Generates srcset string for responsive images
 * 
 * @param src - The source URL
 * @param widths - Array of widths to generate
 * @param transformations - Additional transformations to apply
 * @returns The srcset string or undefined if not a Cloudinary URL
 */
export const generateSrcSet = (
  src: string,
  widths: number[] = [480, 768, 1024, 1280],
  additionalTransformations: string[] = ["f_auto", "q_auto"]
): string | undefined => {
  if (\!isCloudinaryUrl(src)) {
    return undefined;
  }

  return widths
    .map((width) => {
      const transformations = ["c_scale", `w_${width}`, ...additionalTransformations];
      return `${createCloudinaryUrl(src, transformations)} ${width}w`;
    })
    .join(", ");
};