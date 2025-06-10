import React from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";

const linkCss = css`
  color: white;
  text-decoration: none;
  white-space: nowrap;
  font-size: 15px;
  line-height: 22px;
  padding: 19px 0;
  transition: color 0.2s ease;
  color: #ffffff;

  &:hover {
    text-decoration: none;
    color: #e7e7e7;
  }
`;

const DeveloperConsole = () => {
  return (
    <a
      href={process.env.NEXT_PUBLIC_CONSOLE_URL}
      target="_blank"
      rel="noopener noreferrer"
      css={linkCss}
    >
      Developer Console
    </a>
  );
};

export default DeveloperConsole;
