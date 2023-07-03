import React from "react";
import styled from "@emotion/styled";
import { Button } from "@livechat/design-system";

import { platform, apis, sdks, resources, connects } from "constants/header";
import { useAuth } from "contexts/auth";

import MenuItem from "./MenuItem";

const Wrapper = styled.div`
  background-color: #4a4a55;
  color: #ffffff;
  width: 100%;
  height: calc(100vh - 140px);
  overflow: scroll;

  position: fixed;
  top: 60px;
  z-index: 99;
  margin-bottom: 60px;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  position: fixed;
  background-color: #4a4a55;
  z-index: 99;
  width: 100%;
  height: 80px;
  bottom: 0;
`;

const LoginButton = styled(Button)`
  background-color: #4a4a55;
  color: #ffffff;
  margin: 24px;
  width: 90%;
  border-color: #ffffff;

  &:hover {
    background-color: #62626d;
  }

  &:focus {
    box-shadow: 0 0 1px 2px #62626d;
  }
`;

const items = [
  {
    header: "Platform",
    items: [...platform.leftColumn, ...platform.rightColumn],
  },
  {
    header: "APIs & SDKs",
    sections: [
      { title: "APIs", items: apis },
      { title: "SDKs", items: sdks },
    ],
  },
  {
    header: "Recources",
    sections: [
      { title: "", items: resources },
      { title: "Connect", items: connects },
    ],
  },
];

const MobileMenu = () => {
  const { authorize, logout, isAuthorized } = useAuth();

  return (
    <Wrapper>
      {items.map((item) => (
        <MenuItem
          key={`${item.header}`}
          copy={item.header}
          items={item.items}
          sections={item.sections}
        />
      ))}
      <ButtonWrapper>
        {isAuthorized ? (
          <LoginButton onClick={logout}>Log out</LoginButton>
        ) : (
          <LoginButton onClick={authorize}>Log in</LoginButton>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default MobileMenu;
