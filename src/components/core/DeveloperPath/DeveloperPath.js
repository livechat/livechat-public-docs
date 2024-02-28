import React from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import { string, array, node } from "prop-types";
import { DocumentIcon } from "assets/icons/cards/Document";

const wrapperCss = css`
  display: flex;
  margin-top: 32px;

  > div {
    margin-left: 10px;
    width: 300px;
  }

  @media (min-width: 1024px) {
    > div {
      width: auto;
    }
  }
`;

const titleCss = css`
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  display: flex;
  align-items: center;
  color: #424d57;
`;

const subtitleCss = css`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #9898a0;
`;

const linksCss = css`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const linkCss = css`
  display: flex;
  align-items: center;
  color: #0066ff;
  text-decoration: none;

  &:hover {
    color: #0066ff;
    text-decoration: none;
    cursor: pointer;
  }

  > span {
    margin-left: 4px;
  }
`;

const DeveloperPath = ({ title, subtitle, links, image }) => {
  const basePath = process.env.CONTEXT === "deploy-preview" ? "" : "/docs";
  console.log(basePath);
  return (
    <div css={wrapperCss}>
      {image}
      <div>
        <div css={titleCss}>{title}</div>
        <span css={subtitleCss}>{subtitle}</span>
        <div css={linksCss}>
          {links.map((link, index) => (
            <a css={linkCss} href={basePath + link.link} key={index}>
              <DocumentIcon />
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

DeveloperPath.propTypes = {
  title: string.isRequired,
  subtitle: string.isRequired,
  links: array.isRequired,
  image: node.isRequired
};

export default DeveloperPath;
