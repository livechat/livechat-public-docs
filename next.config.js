const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const withYaml = require("next-plugin-yaml");
const readingTime = require("reading-time");

const nextConfig = {
  target: "serverless",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  distDir: `dist${process.env.NEXT_PUBLIC_BASE_PATH}`,
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
  ],
  nextConfig
);
