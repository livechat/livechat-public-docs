import React from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import { string, node, bool } from "prop-types";
import Link from "next/link";

const wrapperCss = css`
  text-decoration: none;
  font-size: 15px;
  line-height: 21px;
  color: #424d57;
  display: block;

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

const iconCss = css`
  height: 30px;
  weight: 30px;
  margin-bottom: 0px;
`;

const badgeCss = css`
  height: 16px;
  weight: 85px;
  margin-bottom: 0px;
`;

const Card = ({ title, link, image, children, badge }) => {
  const basePath = process.env.CONTEXT === "deploy-preview" ? "" : "/docs";

  const header = (
    <div css={titleCss}>
      <p>
        <img src={image} alt="" css={iconCss} />
        <span>{title}</span>
      </p>

      <div>
        {badge && (
          <img src={basePath + "/icons/badge.png"} alt="" css={badgeCss} />
        )}
      </div>
    </div>
  );

  if (link.startsWith("https://")) {
    <a css={wrapperCss} href={link} target="_blank" rel="noopener noreferrer">
      {header}
      {children}
    </a>;
  }

  return (
    <Link href={link} partiallyActive passHref>
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
  image: string.isRequired,
  children: node.isRequired,
  badge: bool,
};

export default Card;
