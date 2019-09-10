import React from "react";
import styled from "@emotion/styled";
import { slugger } from "../core/slugger";

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

const isString = elem => typeof elem === "string";
const isArray = obj => Array.isArray(obj);

export const getId = children => {
  const childrenOfChild = children.props && children.props.children;

  if (childrenOfChild) {
    return getId(childrenOfChild);
  }

  if (isArray(children)) {
    return children.map(item => getId(item)).join("-");
  }

  if (isString(children)) {
    return slugger.slug(children);
  }

  return "unhandled-header-content";
};

export const getText = children => {
  if (typeof children !== "string") {
    return children;
  }
  return children.replace(/{#[A-Za-z0-9-]+}/, "");
};

const makeHeading = size => ({ children }) => {
  const id = getId(children);
  const className = "heading";
  const props = { id, className };

  const Content = () => (
    <HeadingLink href={`#${id}`}>{getText(children)}</HeadingLink>
  );

  switch (size) {
    case "h1":
      return (
        <h2 {...props}>
          <Content />
        </h2>
      );
    case "h2":
      return (
        <h3 {...props}>
          <Content />
        </h3>
      );
    case "h3":
      return (
        <h4 {...props}>
          <Content />
        </h4>
      );
    case "h4":
      return (
        <h5 {...props}>
          <Content />
        </h5>
      );
    case "h5":
      return (
        <h6 {...props}>
          <Content />
        </h6>
      );
    case "h6":
      return (
        <h6 {...props}>
          <Content />
        </h6>
      );
  }
};

// dirty h1 => h2
export default {
  h1: makeHeading("h1"),
  h2: makeHeading("h2"),
  h3: makeHeading("h3"),
  h4: makeHeading("h4"),
  h5: makeHeading("h5"),
  h6: makeHeading("h6")
};
