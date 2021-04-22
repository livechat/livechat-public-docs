const withMdxEnhanced = require("next-mdx-enhanced");
const readingTime = require("reading-time");

module.exports = withMdxEnhanced({
  scan: {
    headings: {
      pattern: /^[\#]+ (.*)/gm,
      transform: (arr) => [...arr],
    },
  },
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
