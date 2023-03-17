import React from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import { string, array } from "prop-types";

const wrapperCss = () => css`
  display: flex;

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
  width: 48px;
  height: 48px;
  margin-bottom: 0px;
`;

const linkIconCss = () => css`
  width: 24px;
  height: 24px;
  margin-bottom: 0px;
  margin-right: 4px;
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
  return (
    <div css={wrapperCss}>
      <img src={image} alt="" css={iconCss} />
      <div>
        <div css={titleCss}>{title}</div>
        <div css={subtitleCss}>{subtitle}</div>
        <div css={linksCss}>
          {links.map((link) => (
            <a css={linkCss}>
              <img src="/docs/icons/document.png" alt="" css={linkIconCss} />
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
