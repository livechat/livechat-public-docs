/**
 * Take the given text and parse it to node format to display markdown link.
 *
 * E.g.
 * Placeholder config:
 * {
 *   from: "{{DEVELOPER_CONSOLE_URL}}",
 *   to: "https://developers.livechat.com/console/",
 *   type: "link",
 *   label: "Developer Console",
 * }
 *
 * {{DEVELOPER_CONSOLE_URL}}
 *
 * will be replaced with
 *
 * <a href="https://developers.livechat.com/console/" target="_blank">Developer Console</a>
 *
 * All the remaining text will be moved to children array as text
 *
 * @param {string} text Text to be parsed
 * @param {object} placeholder Link placeholder config
 * @param {array} children Node children needed to build the link
 */
const parse = (text, placeholder, children = []) => {
  const startPosition = text.indexOf(placeholder.from);
  const endPosition = startPosition + placeholder.from.length;

  const startPart = text.substring(0, startPosition);
  const endPart = text.substring(endPosition);

  children.push({
    type: "text",
    value: startPart,
  });

  children.push({
    type: "jsx",
    value: `<a href="${placeholder.to}" target="_blank">`,
  });

  children.push({
    type: "text",
    value: placeholder.label ? placeholder.label : placeholder.to,
  });

  children.push({
    type: "jsx",
    value: "</a>",
  });

  // Check if there is more placeholders in the text
  if (endPart.includes(placeholder.from)) {
    return parse(endPart, placeholder, children);
  } else {
    children.push({
      type: "text",
      value: endPart,
    });

    return children;
  }
};

module.exports = parse;
