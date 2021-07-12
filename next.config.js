const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const withYaml = require("next-plugin-yaml");
const readingTime = require("reading-time");
const withImages = require("next-images");

const nextConfig = {
  target: "serverless",
  basePath: "/docs",
  distDir: `dist/docs`,
  productionBrowserSourceMaps: true,
};

module.exports = withPlugins(
  [
    [
      withMdxEnhanced({
        layoutPath: "src/components/Page",
        defaultLayout: true,
        fileExtensions: ["mdx"],
        remarkPlugins: [],
        rehypePlugins: [
          require("rehype-slug"),
          require("rehype-autolink-headings"),
          require("@mapbox/rehype-prism"),
        ],
        usesSrc: false,
        extendFrontMatter: {
          process: (mdxContent, frontMatter) => {
            const time = readingTime(mdxContent);
            if (time.minutes < 0.5) {
              time.minutes = 1;
            }
            return {
              timeToRead: time,
            };
          },
          phase: "both",
        },
        reExportDataFetching: false,
      }),
    ],
    [withYaml],
    [withImages],
  ],
  nextConfig
);
