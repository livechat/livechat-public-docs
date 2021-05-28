const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const withYaml = require("next-plugin-yaml");
const readingTime = require("reading-time");

const nextConfig = {
  target: "serverless",
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
        ],
        usesSrc: false,
        extendFrontMatter: {
          process: (mdxContent, frontMatter) => {
            return {
              timeToRead: readingTime(mdxContent),
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

// module.exports = withMdxEnhanced({
//   layoutPath: "src/components/Page",
//   defaultLayout: true,
//   fileExtensions: ["mdx"],
//   remarkPlugins: [],
//   rehypePlugins: [require("rehype-slug"), require("rehype-autolink-headings")],
//   usesSrc: false,
//   extendFrontMatter: {
//     process: (mdxContent, frontMatter) => {
//       return {
//         timeToRead: readingTime(mdxContent),
//       };
//     },
//     phase: "both",
//   },
//   reExportDataFetching: false,
// })({
//   target: "serverless",
// });
