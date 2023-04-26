import React from "react";
import styled from "@emotion/styled";
import ArrowRight from "react-material-icon-svg/dist/ArrowRight";

import { resources, connects } from "constant/header";

import Dropdown from "./Dropdown";
import Separator from "./Separator";
import DropdownItem from "./DropdownItem";
import Connect from "./Connect";

const Wrapper = styled.div`
  display: flex;
  height: 400px;
  > div {
    margin: 8px 0px;
  }

  > div:first-of-type {
    margin-top: 16px;
  }
`;

const TitleWrapper = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  color: #808189;
  padding: 20px 0px 8px 24px;
`;

const ActionLink = styled.a`
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

const Resources = () => {
  return (
    <Dropdown label="Resources">
      <Wrapper>
        <div>
          {resources.map((resource) => (
            <DropdownItem
              key={`${resource.title}`}
              title={resource.title}
              description={resource.description}
              to={resource.link}
            />
          ))}
        </div>
        <Separator />
        <div>
          <TitleWrapper>CONNECT</TitleWrapper>
          {connects.map((connect) => (
            <Connect
              key={`${connect.title}`}
              title={connect.title}
              image={connect.primaryIcon}
              link={connect.link}
            />
          ))}
        </div>
      </Wrapper>
      <ActionLink
        href={process.env.NEXT_PUBLIC_CONSOLE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Create a developer account <ArrowRight />
      </ActionLink>
    </Dropdown>
  );
};

export default Resources;
