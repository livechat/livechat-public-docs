import React from "react";
import slugify from "slugify";
import styled from "@emotion/styled";

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

export const getId = children => {
  if (typeof children !== "string") {
    return "fix-me";
  }

  const customId = children.match(/{#([A-Za-z0-9-]+)}/);
  if (customId) {
    return customId[1];
  }

  return slugify(children, { lower: true });
};

export const getText = children => {
  if (typeof children !== "string") {
    return children;
  }
  return children.replace(/{#[A-Za-z0-9-]+}/, "");
};

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
