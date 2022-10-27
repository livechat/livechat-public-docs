import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { string, node } from "prop-types";

import { LinkIcon } from "../core/icons";

const CodeLink = styled.a`
  text-decoration: none;
  svg {
    vertical-align: middle;
    margin-left: 2px;
    margin-right: 4px;
    color: #4284F5;
  }
  code{
    color: #4284F5;
  }
  &:hover,
  &:active {
    text-decoration: none;
    code {
      color:#4284F5;
      text-decoration: underline;
    }
  }
`;

const Redirect = ({ children, href, ...rest }) => {
    // hack for code-links
    if (children.props && children.props.mdxType === "inlineCode") {
      return (
        <Link href={href} passHref>
          <CodeLink {...rest}>
            {children}
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
        <Link href={href} passHref>
          <a>{children}</a>
        </Link>
      );
    }
  
    if (
      children.props &&
      (children.props.parentName === "a" || children.props.mdxType === "a")
    ) {
      return <Link href={href}>
        <a>
        {children}
        </a>
        </Link>;
    }
  
    return (
      <Link href={href} {...rest} passHref>
        <a {...rest}>{children}</a>
      </Link>
    );
  };

  Redirect.propTypes={
    href: string,
    children:node,
  }
  export default Redirect;