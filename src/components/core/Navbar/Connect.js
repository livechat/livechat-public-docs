import React from "react";
import { string, node } from "prop-types";
import styled from "@emotion/styled";

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #1b1b20;
  padding: 8px;
  margin: 4px 0px;
  border-radius: 8px;
  width: 252px;

  &:hover {
    background-color: #f6f6f7;
    cursor: pointer;
    color: #1b1b20;
    text-decoration: none;
  }
`;

const ImagePlaceholder = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f7;
  height: 30px;
  width: 30px;
  border-radius: 4px;
  margin-right: 4px;
`;

const Connect = ({ title, image, link }) => {
  return (
    <Wrapper href={link} target="_blank" rel="noopener noreferrer">
      <ImagePlaceholder>{image}</ImagePlaceholder>
      {title}
    </Wrapper>
  );
};

Connect.propTypes = {
  title: string.isRequired,
  image: node.isRequired,
  link: string.isRequired,
};

export default Connect;
