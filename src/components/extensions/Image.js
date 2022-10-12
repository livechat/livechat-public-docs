import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";



const imgWrapper = (imageMarginBottom) => css`
  display: block;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: ${imageMarginBottom || "10px"};
`;

const boxStyles = (imageHeight, imageWidth) => css`
  box-sizing: border-box;
  display: block;
  max-width: 100%;
  padding-top: calc(${imageHeight} / ${imageWidth} * 100%);
`;

const imgStyles = () => css`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  padding: 0;
  border: none;
  margin: auto;
  display: block;
  width: 0;
  height: 0;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
`;

const Image = ({ src, height, width, marginBottom, ...rest }) => {
  if (!src || !height || !width) {
    throw new Error("Missing one of the props: src, height or width");
  }
  const source = src.startsWith("http") ? src : `/docs${src}`;
  const imageHeight = height.replace("px", "");
  const imageWidth = width.replace("px", "");
  return (
    <div css={() => imgWrapper(marginBottom)}>
      <div css={() => boxStyles(imageHeight, imageWidth )}>
      <img {...rest} src={source} decoding="async" css={imgStyles} />
      </div> 
    </div>
  );
};

export default  Image;
