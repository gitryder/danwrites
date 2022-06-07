module.exports = {
  // The fallback variable used here - process.env.URL
  // is the env variable provided by Netlify.
  baseUrl: `${process.env.BASE_URL || process.env.URL}`,
  nodeEnv: process.env.NODE_ENV,
}