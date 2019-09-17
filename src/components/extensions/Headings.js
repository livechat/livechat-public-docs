import React from "react";
import styled from "@emotion/styled";

import { LinkIcon } from "../core/icons";
import { Link } from "gatsby";

const HeadingLink = styled.a`
  color: inherit;
  text-decoration: none;
  position: relative;
  &:hover {
    color: inherit;
    text-decoration: none;
    &:before {
      content: "#";
      position: absolute;
      font-weight: 300;
      left: -1em;
      top: 1px;
      opacity: 0.3;
    }
  }
`;

const CodeLink = styled.a`
  text-decoration: none;
  svg {
    vertical-align: middle;
    margin-left: 2px;
    margin-right: 4px;
    color: var(--code-inline-color);
  }
  &:hover,
  &:active {
    text-decoration: none;
    code {
      background-color: #efe8e8;
    }
  }
`;

const A = ({ children, ...props }) => {
  // hack for code-links
  if (children.props && children.props.originalType === "code") {
    return (
      <CodeLink {...props}>
        {children}
        <LinkIcon />
      </CodeLink>
    );
  }

  return <a {...props}>{children}</a>;
};

export const getText = children => {
  if (typeof children !== "string") {
    return children;
  }
  return children.replace(/{#[A-Za-z0-9-]+}/, "");
};

const H2 = styled.h2`
  border-bottom: 1px solid #e0e4e9;
  padding-bottom: 0.5em;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const SectionGatsbyLink = styled(Link)`
  font-weight: 600;
  &:after {
    content: "";
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 1px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' fill='%232200ff'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  }
`;

const SectionALink = styled.a`
  font-weight: 600;
  &:after {
    content: "";
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 1px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' fill='%232200ff'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  }
`;

const SectionLink = ({ to, href, ...rest }) =>
  to ? (
    <SectionGatsbyLink to={to} {...rest} />
  ) : (
    <SectionALink href={href} target={"_blank"} {...rest} />
  );

const makeHeading = size => ({ children, ...props }) => {
  const className = "heading";
  const newProps = { ...props, className };

  const Content = () => (
    <HeadingLink href={`#${props.id}`}>{getText(children)}</HeadingLink>
  );

  switch (size) {
    case "h1":
      return (
        <H2 {...newProps}>
          <Content />
        </H2>
      );
    case "h2":
      return (
        <h3 {...newProps}>
          <Content />
        </h3>
      );
    case "h3":
      return (
        <h4 {...newProps}>
          <Content />
        </h4>
      );
    case "h4":
      return (
        <h5 {...newProps}>
          <Content />
        </h5>
      );
    case "h5":
      return (
        <h6 {...newProps}>
          <Content />
        </h6>
      );
    case "h6":
      return (
        <h6 {...newProps}>
          <Content />
        </h6>
      );
    default:
      return null;
  }
};

// dirty h1 => h2
export default {
  h1: makeHeading("h1"),
  h2: makeHeading("h2"),
  h3: makeHeading("h3"),
  h4: makeHeading("h4"),
  h5: makeHeading("h5"),
  h6: makeHeading("h6"),
  a: A,
  SectionLink,
  table: ({ children }) => (
    <TableWrapper>
      <table>{children}</table>
    </TableWrapper>
  )
};
