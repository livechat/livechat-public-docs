const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");
const parsers = require("./parsers");
const placeholders = require("./placeholders");

const processNodeChildren = (children, placeholder) => {
  let nodeChildren = [];

  children.forEach((child) => {
    switch (child.type) {
      case "text":
        if (child.value.includes(placeholder.from)) {
          switch (placeholder.type) {
            case "link": {
              const parsedChildren = parsers.link(child.value, placeholder);
              nodeChildren = [...nodeChildren, ...parsedChildren];

              break;
            }

            case "text": {
              const parsedChildren = parsers.text(child.value, placeholder);
              nodeChildren = [...nodeChildren, ...parsedChildren];

              break;
            }

            default:
          }
        } else {
          nodeChildren.push(child);
        }
        break;

      default:
        nodeChildren.push(child);
    }
  });

  return nodeChildren;
};

module.exports = ({ markdownAST, markdownNode }, pluginOptions) => {
  // Loop through all paragraphs from mdx files
  visit(markdownAST, "paragraph", (node) => {
    let children = [...node.children];

    placeholders.forEach((placeholder) => {
      children = processNodeChildren(children, placeholder);
    });

    node.children = children;
  });

  return markdownAST;
};
