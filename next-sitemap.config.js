const NEXT_SSG_FILES = [
  "/*.json$",
  "/*_buildManifest.js$",
  "/*_middlewareManifest.js$",
  "/*_ssgManifest.js$",
  "/*.js$",
];

module.exports = {
  siteUrl: "https://platform.text.com/docs",
  generateRobotsTxt: true,
  sourceDir: ".next",
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: NEXT_SSG_FILES,
      },
    ],
  },
};
