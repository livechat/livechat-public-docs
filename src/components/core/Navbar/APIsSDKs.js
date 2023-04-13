import React, { Fragment } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import ArrowRight from "react-material-icon-svg/dist/ArrowRight";

import { apis, sdks } from "constant/header";

import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import Separator from "./Separator";

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
`;

const ActionLink = styled.span`
  font-family: Colfax, colfax-web, Proxima Nova, Open Sans, Gill Sans MT,
    Gill Sans, Corbel, Arial, sans-serif;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f6f7;
  width: 100%;
  height: 64px;
  cursor: pointer;

  > svg {
    transition: right 0.5s;
    right: 165px;
    position: absolute;
  }

  &:hover {
    color: #1b1b20;
    text-decoration: none;
    background-color: #eeeeef;
    > svg {
      right: 155px;
    }
  }

  color: #1b1b20;
  position: absolute;
  bottom: 0;
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
              to={api.link}
              title={api.title}
              description={api.description}
            />
          ))}
        </div>
        <Separator height="450px" />
        <div>
          <TitleWrapper>SDKs</TitleWrapper>
          {sdks.map((sdk) => (
            <DropdownItem
              to={sdk.link}
              title={sdk.title}
              description={sdk.description}
            />
          ))}
        </div>
      </Wrapper>
      <Link href="/apis-and-sdks">
        <ActionLink>
          Browse all APIs & SDKs <ArrowRight />
        </ActionLink>
      </Link>
    </Dropdown>
  );
};

export default APIsSDKs;
