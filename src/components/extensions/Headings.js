import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import Link from "next/link";

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

const Pre = ({ children, ...props }) => {
  return (
    <div className="remark-highlight">
      <pre {...props}>{children}</pre>
    </div>
  );
};

const imgWrapper = () => css`
  display: block;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin: 0;
`;

const boxStyles = (imageHeight, imageWidth) => css`
  box-sizing: border-box;
  display: block;
  max-width: 100%;
  padding-top: calc(${imageHeight} / ${imageWidth} * 100%);
`;

const imgStyles = () => css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  padding: 0;
  border: none;
  margin: auto;
  display: block;
  width: 0;
  height: 0;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
`;

const Img = ({ ...props }) => {
  if (!props?.src || !props?.height || !props?.width) {
    throw new Error("Missing one of the props: src, height or width");
  }

  const src = props.src.startsWith("http") ? props.src : `/docs${props.src}`;

  // TODO: This is a workaround for next/image.
  // Currently there is an issue with basePath.
  const imageHeight = props.height.replace("px", "");
  const imageWidth = props.width.replace("px", "");

  return (
    <div css={imgWrapper}>
      <div css={() => boxStyles(imageHeight, imageWidth)}></div>
      <img {...props} src={src} decoding="async" css={imgStyles} />
    </div>
  );
};

const A = ({ children, ...props }) => {
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
        <picture>
          <source
            srcset="/docs/images/livechat-platform-messaging.webp"
            type="image/webp"
          />
          <source
            srcset="/docs/images/livechat-platform-messaging.jpg"
            type="image/jpeg"
          />
          <img
            src="/docs/images/livechat-platform-messaging.jpg"
            alt="Livechat platform messaging"
          />
        </picture>
      );

    case "/extending-agent-app/":
      return (
        <picture>
          <source
            srcset="/docs/images/livechat-platform-extend-interfaces.webp"
            type="image/webp"
          />
          <source
            srcset="/docs/images/livechat-platform-extend-interfaces.jpg"
            type="image/jpeg"
          />
          <img
            src="/docs/images/livechat-platform-extend-interfaces.jpg"
            alt="Livechat platform extend interfaces"
          />
        </picture>
      );
    case "/data-reporting/":
      return (
        <picture>
          <source
            srcset="/docs/images/livechat-platform-data-reporting.webp"
            type="image/webp"
          />
          <source
            srcset="/docs/images/livechat-platform-data-reporting.jpg"
            type="image/jpeg"
          />
          <img
            src="/docs/images/livechat-platform-data-reporting.jpg"
            alt="Livechat platform data reporting"
          />
        </picture>
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

  const { id, ...rest } = props;
  const newProps = { ...rest, className };

  const Content = () => (
    <HeadingLink id={id} href={`#${id}`} className="reference">
      {getText(children)}
    </HeadingLink>
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
  pre: Pre,
  Warning,
  SectionBanner,
  SectionLink,
  table: ({ children }) => (
    <TableWrapper>
      <table>{children}</table>
    </TableWrapper>
  ),
};
