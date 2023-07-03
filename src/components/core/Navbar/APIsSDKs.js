import React from "react";
import styled from "@emotion/styled";

import { apis, sdks } from "constants/header";

import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import Separator from "./Separator";

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
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

const APIsSDKs = () => {
  return (
    <Dropdown label="APIs & SDKs">
      <Wrapper>
        <div>
          <TitleWrapper>APIs</TitleWrapper>
          {apis.map((api) => (
            <DropdownItem
              key={`${api.title}`}
              to={api.link}
              title={api.title}
              description={api.description}
            />
          ))}
        </div>
        <Separator />
        <div>
          <TitleWrapper>SDKs</TitleWrapper>
          {sdks.map((sdk) => (
            <DropdownItem
              key={`${sdk.title}`}
              to={sdk.link}
              title={sdk.title}
              description={sdk.description}
            />
          ))}
        </div>
      </Wrapper>
    </Dropdown>
  );
};

export default APIsSDKs;
