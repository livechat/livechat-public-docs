import React from "react";
import styled from "@emotion/styled";

import { platform } from "constant/header";

import Dropdown from "./Dropdown";
import Separator from "./Separator";
import DropdownItem from "./DropdownItem";

const Wrapper = styled.div`
  display: flex;
  padding-bottom: 12px;
`;

const TitleWrapper = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  color: #808189;
  padding: 20px 20px 8px 24px;
  margin-left: 12px;
`;

const Platform = () => {
  return (
    <Dropdown label="Platform">
      <TitleWrapper>PLATFORM COMPONENTS</TitleWrapper>
      <Wrapper height="520px">
        <div>
          {platform.leftColumn.map((component) => (
            <DropdownItem
              title={component.title}
              description={component.description}
              to={component.link}
              image={component.image}
            />
          ))}
        </div>
        <Separator />
        <div>
          {platform.rightColumn.map((component) => (
            <DropdownItem
              title={component.title}
              description={component.description}
              to={component.link}
              image={component.image}
              badge={component.badge}
            />
          ))}
        </div>
      </Wrapper>
    </Dropdown>
  );
};

export default Platform;
