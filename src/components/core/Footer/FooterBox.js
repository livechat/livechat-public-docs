import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { string, oneOfType, node } from "prop-types";
import { Button } from "@livechat/design-system";

const wrapperCss = () => css`
  width: 100%;
  padding: 20px;

  @media (min-width: 768px) {
    margin-top: 75px;
    padding: 0px 24px 40px 24px;
    width: 160px;
  }

  @media (min-width: 1024px) {
    padding: 0;
  }
`;

const titleCss = () => css`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #424d57;
`;

const contentCss = () => css`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #424d57;
`;

const buttonCss = () => css`
  margin-top: 5px;
`;

const linkCss = () => css`
  &:hover {
    text-decoration: none;
  }
`;

const FooterBox = ({ title, content, buttonCopy, buttonIcon, buttonLink }) => {
  return (
    <div css={wrapperCss}>
      <div css={titleCss}>{title}</div>
      <div css={contentCss}>{content}</div>
      {buttonCopy && (
        <a
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          css={linkCss}
        >
          <Button
            css={buttonCss}
            kind="secondary"
            size="compact"
            icon={buttonIcon}
          >
            {buttonCopy}
          </Button>
        </a>
      )}
    </div>
  );
};

FooterBox.propTypes = {
  title: string,
  content: oneOfType([string, node]),
  buttonCopy: string,
  buttonIcon: node,
  buttonLink: string,
};

export default FooterBox;
