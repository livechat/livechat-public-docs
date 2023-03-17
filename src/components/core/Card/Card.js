import React from "react";
/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import { string, node } from "prop-types";
import Link from "next/link";

const wrapperCss = () => css`
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

const titleCss = () => css`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  > p {
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 0px;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.005em;
    color: #424d57;
  }
`;

const iconCss = () => css`
  width: 30px;
  height: 30px;
  margin-bottom: 0px;
`;

const Card = ({ title, link, image, children }) => {
  return (
    <Link href={link} partiallyActive passHref>
      <a css={wrapperCss}>
        <div css={titleCss}>
          <img src={image} alt="" css={iconCss} />
          <p>{title}</p>
        </div>
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
};

export default Card;
