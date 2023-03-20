import React from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import { string, array } from "prop-types";
import Image from "next/image";

const wrapperCss = () => css`
  display: flex;
  margin-top: 32px;

  > div {
    margin-left: 10px;
  }

  > div:first-of-type {
    width: 48px;
    height: 48px;
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
      <Image src={image} alt="" width="48px" height="48px" />
      <div>
        <div css={titleCss}>{title}</div>
        <div css={subtitleCss}>{subtitle}</div>
        <div css={linksCss}>
          {links.map((link) => (
            <a css={linkCss}>
              <Image
                src={basePath + "/icons/document.png"}
                alt=""
                width="24px"
                height="24px"
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
