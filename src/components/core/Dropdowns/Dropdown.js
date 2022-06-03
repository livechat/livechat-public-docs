import React, { useState } from "react";
import { node, string } from "prop-types";
import ChevronDown from "react-material-icon-svg/dist/ChevronDown";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 100%;
  color: #ffffff;
  font-weight: 400;
  display: flex;
  align-items: center;

  &:hover {
    cursor: default;
  }
`;

const Content = styled.div`
  display: block;
  position: fixed;
  top: 70px;
  z-index: 100;
  color: #000000;

  background-color: #ffffff;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.05),
    0px 40px 34px -16px rgba(0, 0, 0, 0.08),
    0px 6px 4px -4px rgba(0, 0, 0, 0.06), 0px 16px 16px -8px rgba(0, 0, 0, 0.12);
  border-radius: 10px;

  height: 488px;
  width: 592px;
`;

const Dropdown = ({ children, label }) => {
  const [displayContent, setDisplayContent] = useState(false);
  return (
    <Wrapper
      onMouseEnter={() => setDisplayContent(true)}
      onMouseLeave={() => setDisplayContent(false)}
    >
      {label}
      <ChevronDown fill="#FFFFFF" />
      {displayContent && <Content>{children}</Content>}
    </Wrapper>
  );
};

Dropdown.propTypes = {
  label: string,
  children: node,
};

export default Dropdown;
