const Image = require('@11ty/eleventy-img');

/**
 * Uses Eleventy's Image utility to get image from Unsplash,
 * caches them locally, and returns the HTML for the image.
 */
const asyncImageShortcode = async (postSlug, url, alt) => {
  if (postSlug === undefined) {
    throw new Error('Please provide a post slug, required for the image name.');
  }

  const sizes = '(max-width: 600px) 480px, (max-width: 1024px) 768px, 1200px';

  const metadata = await Image(url, {
    widths: [480, 768, 1200],
    formats: ['webp', 'jpeg'],
    outputDir: `./_site/img/`,
    filenameFormat: (id, src, width, format) => {
      return `${postSlug}--${width}.${format}`;
    },
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes);
};

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(['html', 'njk', 'jpg', 'md']);
  eleventyConfig.addNunjucksAsyncShortcode(
    'unsplashImage',
    asyncImageShortcode,
  );

  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
  };
};
