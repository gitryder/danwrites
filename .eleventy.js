const Image = require('@11ty/eleventy-img');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const { DateTime } = require('luxon');

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
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes);
};

/** Uses luxon's DateTime to return a readable date format */
const getReadableDate = dateObj => {
  return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(
    DateTime.DATE_MED,
  );
};

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(['html', 'njk', 'jpg', 'md']);
  eleventyConfig.addNunjucksAsyncShortcode('remoteImage', asyncImageShortcode);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addFilter('readableDate', getReadableDate);

  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
  };
};
