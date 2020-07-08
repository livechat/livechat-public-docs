/**
 * Take the given text with placeholder and parse it to node format to display text.
 *
 * E.g.
 * Placeholder config:
 * {
 *   from: "{{NUMBER_OF_CUSTOMERS}}",
 *   to: "30,000",
 *   type: "text",
 * }
 *
 * {{NUMBER_OF_CUSTOMERS}}
 *
 * will be replaced with
 *
 * 30,000
 *
 * All the remaining text will be moved to children array as text
 *
 * @param {string} text Text to be parsed
 * @param {object} placeholder Text placeholder config
 * @param {array} children Node children needed to build the text
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
    type: "text",
    value: placeholder.to,
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
