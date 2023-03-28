import React from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import { string, node, bool } from "prop-types";
import Link from "next/link";
import { ComingSoonIcon } from "assets/icons/cards/ComingSoon";

const wrapperCss = css`
  text-decoration: none;
  font-size: 15px;
  line-height: 21px;
  color: #424d57;
  display: block;
  cursor: pointer;

  width: 279px;
  height: 114px;
  background-color: #fcfcfc;
  border: 1px solid #fcfcfc;
  border-radius: 4px;
  padding: 16px 24px;

  &:hover {
    text-decoration: none;
    color: #424d57;
    background-color: #f6f6f7;
    border: 1px solid #f6f6f7;
  }
`;

const titleCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  > p {
    display: flex;
    align-items: center;
    margin-bottom: 0px;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.005em;
    color: #424d57;

    > span {
      margin-left: 8px;
    }
  }
`;

const Card = ({ title, link, image, children, badge }) => {
  const header = (
    <div css={titleCss}>
      <p>
        {image}
        <span>{title}</span>
      </p>

      <div>{badge && <ComingSoonIcon />}</div>
    </div>
  );

  if (link.startsWith("https://")) {
    return (
      <a css={wrapperCss} href={link} target="_blank" rel="noopener noreferrer">
        {header}
        {children}
      </a>
    );
  }

  return (
    <Link href={link}>
      <a css={wrapperCss}>
        {header}
        {children}
      </a>
    </Link>
  );
};

Card.propTypes = {
  title: string.isRequired,
  link: string.isRequired,
  image: node.isRequired,
  children: node.isRequired,
  badge: bool,
};

export default Card;
