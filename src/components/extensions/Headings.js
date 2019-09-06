import React from "react";
import slugify from "slugify";
import styled from "@emotion/styled";

const generateSlug = text => {
  const customId = text.match(/{#([A-Za-z0-9-]+)}/);

  if (customId) {
    return customId[1];
  }
  return slugify(text, { lower: true });
};

const isString = elem => typeof elem === "string";
const isArrayOfStrings = obj =>
  Array.isArray(obj) && obj.reduce((v, elem) => v && isString(elem));

export const getId = children => {
  let content = children;

  const childrenOfChild = content.props && content.props.children;

  if (isString(content)) {
    return generateSlug(content);
  }

  if (isArrayOfStrings(content)) {
    return generateSlug(content.reduce((str, elem) => (str += elem), ""));
  }

  if (childrenOfChild) {
    return getId(childrenOfChild);
  }

  return "unhandled-header-content";
};

export const getText = children => {
  if (typeof children !== "string") {
    return children;
  }
  return children.replace(/{#[A-Za-z0-9-]+}/, "");
};

const HeadingLink = styled.a`
  color: inherit;
  text-decoration: none;
  position: relative;
  &:hover {
    color: inherit;
    &:before {
      content: "#";
      position: absolute;
      font-weight: 300;
      left: -1em;
      opacity: 0.3;
    }
  }
`;

// dirty h1 => h2
export default {
  h1: ({ children }) => (
    <h2 id={getId(children)} className={"heading"}>
      <HeadingLink href={`#${getId(children)}`}>
        {getText(children)}
      </HeadingLink>
    </h2>
  ),
  h2: ({ children }) => (
    <h3 id={getId(children)} className={"heading"}>
      <HeadingLink href={`#${getId(children)}`}>
        {getText(children)}
      </HeadingLink>
    </h3>
  ),
  h3: ({ children }) => (
    <h4 id={getId(children)} className={"heading"}>
      <HeadingLink href={`#${getId(children)}`}>
        {getText(children)}
      </HeadingLink>
    </h4>
  ),
  h4: ({ children }) => (
    <h5 id={getId(children)} className={"heading"}>
      <HeadingLink href={`#${getId(children)}`}>
        {getText(children)}
      </HeadingLink>
    </h5>
  ),
  h5: ({ children }) => (
    <h6 id={getId(children)} className={"heading"}>
      <HeadingLink href={`#${getId(children)}`}>
        {getText(children)}
      </HeadingLink>
    </h6>
  ),
  h6: ({ children }) => (
    <h6 id={getId(children)} className={"heading"}>
      <HeadingLink href={`#${getId(children)}`}>
        {getText(children)}
      </HeadingLink>
    </h6>
  )
};
