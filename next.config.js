const withMdxEnhanced = require("next-mdx-enhanced");
const readingTime = require("reading-time");

module.exports = withMdxEnhanced({
  layoutPath: "src/components/Page",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  remarkPlugins: [],
  rehypePlugins: [],
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
})({
  target: "serverless",
});
