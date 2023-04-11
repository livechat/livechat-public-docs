import React from "react";
import styled from "@emotion/styled";

import { resources, connects } from "constant/header";

import Dropdown from "./Dropdown";
import Separator from "./Separator";
import DropdownItem from "./DropdownItem";
import Connect from "./Connect";

const Wrapper = styled.div`
  display: flex;
  > div {
    margin: 8px 0px;
  }
`;

const TitleWrapper = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  color: #808189;
  padding: 20px 0px 8px 8px;
`;

const Resources = () => {
  return (
    <Dropdown label="Resources">
      <Wrapper height="520px">
        <div>
          {resources.map((resource) => (
            <DropdownItem
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
              title={connect.title}
              image={connect.image}
              link={connect.link}
            />
          ))}
        </div>
      </Wrapper>
    </Dropdown>
  );
};

export default Resources;
