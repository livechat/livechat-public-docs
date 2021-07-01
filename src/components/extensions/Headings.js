import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@livechat/design-system";
import { LinkIcon } from "../core/icons";

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

const Img = ({ ...props }) => {
  return (
    <img {...props} src={`${process.env.NEXT_PUBLIC_BASE_PATH}${props.src}`} />
  );
};

const A = ({ children, ...props }) => {
  // hack for code-links
  if (children.props && children.props.mdxType === "inlineCode") {
    return (
      <Link href={props.href}>
        <CodeLink {...props}>
          {children}
          <LinkIcon />
        </CodeLink>
      </Link>
    );
  }

  if (children.props && children.props.mdxType === "strong") {
    return (
      <Link href={props.href} passHref>
        <a>{children}</a>
      </Link>
    );
  }

  if (children.props && children.props.originalType === "img") {
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
      <a>{children}</a>
    </Link>
  );
};

export const getText = (children) => {
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

const SectionBannerWrapper = styled.div`
  background-color: #f1f6f8;
  display: flex;
  align-items: center;
  max-width: 100%;
  margin-bottom: 2.5em;
  border-radius: 8px;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SectionColumn = styled.div`
  flex-shrink: 2;
  padding: 2em;
  h2 {
    margin-top: 0;
  }

  @media (min-width: 480px) {
    min-width: 350px;
  }
`;

const StyledImage = styled.img`
  display: block;
  margin: 0;
  max-width: 100%;
`;

export const Warning = styled.div`
  border: 1px solid #ffbb00;
  border-radius: 6px;
  padding: 1.5em 1.5em 0;
  margin-bottom: 1.5em;
  background-color: #ffd000;
`;

const BannerImage = ({ to }) => {
  switch (to) {
    case "/messaging/":
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/livechat-platform-messaging.jpg`}
          alt="Livechat platform messaging"
          layout="responsive"
          width={782}
          height={682}
          priority
        />
      );

    case "/extending-agent-app/":
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/livechat-platform-extend-interfaces.jpg`}
          alt="Livechat platform extend interfaces"
          layout="responsive"
          width={782}
          height={682}
          priority
        />
      );
    case "/data-reporting/":
      return (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/livechat-platform-data-reporting.jpg`}
          alt="Livechat platform data reporting"
          layout="responsive"
          width={782}
          height={682}
          priority
        />
      );
    default:
      return null;
  }
};

const SectionBanner = ({ title, desc, to, image }) => (
  <SectionBannerWrapper>
    {image && (
      <SectionColumn style={{ padding: 0 }}>
        <Link href={to} style={{ display: "block" }}>
          <a>
            <BannerImage to={to} />
          </a>
        </Link>
      </SectionColumn>
    )}
    <SectionColumn>
      <h2>{title}</h2>
      <p>{desc}</p>
      <Link href={to}>
        <a>
          <Button>Learn more</Button>
        </a>
      </Link>
    </SectionColumn>
  </SectionBannerWrapper>
);

const StyledLink = styled.a`
  font-weight: 600;
  cursor: pointer;

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

// const SectionALink = styled.a`
//   font-weight: 600;
//   &:after {
//     content: "";
//     width: 16px;
//     height: 16px;
//     display: inline-block;
//     vertical-align: middle;
//     margin-bottom: 1px;
//     background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' fill='%232200ff'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
//   }
// `;

const SectionLink = ({ to, href, children, ...rest }) => {
  if (href) {
    return (
      <Link href={href} target="_blank" {...rest}>
        <StyledLink>{children}</StyledLink>
      </Link>
    );
  }

  if (to) {
    return (
      <Link href={to} {...rest}>
        <StyledLink>{children}</StyledLink>
      </Link>
    );
  }

  return <StyledLink>{children}</StyledLink>;
};

const makeHeading = (size) => ({ children, ...props }) => {
  const className = "heading";

  const id = props.id;

  const newProps = { ...props, className, id };

  const Content = () => (
    <HeadingLink href={`#${id}`}>{getText(children)}</HeadingLink>
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
  img: Img,
  Warning,
  SectionBanner,
  SectionLink,
  table: ({ children }) => (
    <TableWrapper>
      <table>{children}</table>
    </TableWrapper>
  ),
};
