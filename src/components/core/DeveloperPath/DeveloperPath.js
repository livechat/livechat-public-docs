import React from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import { string, array } from "prop-types";

const wrapperCss = () => css`
  display: flex;
  margin-top: 32px;

  > div {
    margin-left: 10px;
  }
`;

const titleCss = () => css`
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  display: flex;
  align-items: center;
  color: #424d57;
`;

const subtitleCss = () => css`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #9898a0;
`;

const iconCss = () => css`
  height: 48px;
  weight: 48px;
  margin-bottom: 0px;
`;

const iconLinkCss = () => css`
  height: 24px;
  weight: 24px;
  margin-bottom: 0px;
`;

const linksCss = () => css`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const linkCss = () => css`
  display: flex;
  align-items: center;
  color: #0066ff;
  text-decoration: none;

  &:hover {
    color: #0066ff;
    text-decoration: none;
    cursor: pointer;
  }
`;

const DeveloperPath = ({ title, subtitle, links, image }) => {
  const basePath = process.env.CONTEXT === "deploy-preview" ? "" : "/docs";

  return (
    <div css={wrapperCss}>
      <img src={image} alt="" css={iconCss} />
      <div>
        <div css={titleCss}>{title}</div>
        <div css={subtitleCss}>{subtitle}</div>
        <div css={linksCss}>
          {links.map((link) => (
            <a css={linkCss} href={basePath + link.link}>
              <img
                src={basePath + "/icons/document.png"}
                alt=""
                css={iconLinkCss}
              />
              {link.name}
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
  image: string.isRequired,
};

export default DeveloperPath;
