import React from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";

const linkCss = css`
  border-radius: 0.25rem;
  border-style: solid;
  border-width: 1px;
  display: none;
  font-weight: 500;
  line-height: normal;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border 0.2s;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  color: #ffffff;
  border-color: #c9c9cd;
  margin-right: 0.5rem;
  height: 36px;

  &:hover {
    text-decoration: none;
    color: #424d57;
    border-color: #424d57;
    background-color: #ffffff;
  }

  @media (min-width: 1024px) {
    display: inline-block;
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
