module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(['html', 'njk', 'jpg']);

  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
  };
};
