import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { LinkIcon } from "../core/icons";
import Link from "next/link";
import styled from "@emotion/styled";

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

const CustomLink = ({ children, ...props }) => {
    // hack for code-links
    if (children.props && children.props.mdxType === "inlineCode") {
      return (
        <Link href={props.href} passHref>
          <CodeLink {...props}>
            {children}
            <LinkIcon />
          </CodeLink>
        </Link>
      );
    }
  
    if (
      children.props &&
      (children.props.mdxType === "strong" ||
        children.props.originalType === "img")
    ) {
      return (
        <Link href={props.href} passHref>
          <a>{children}</a>
        </Link>
      );
    }
  
    if (
      children.props &&
      (children.props.parentName === "a" || children.props.mdxType === "a")
    ) {
      return <Link href={props.href}>{children}</Link>;
    }
  
    return (
      <Link {...props} passHref>
        <a {...props}>{children}</a>
      </Link>
    );
  };

  export default CustomLink;