import React from "react";
import styled from "@emotion/styled";

import { platform, apis, sdks, resources, connects } from "constants/header";

import MenuItem from "./MenuItem";

const Wrapper = styled.div`
  background-color: #4a4a55;
  color: #ffffff;
  width: 100%;
  height: 100vh;
  overflow: scroll;

  position: fixed;
  top: 60px;
  z-index: 99;
  margin-bottom: 60px;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const DirectLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  padding: 26px 24px;
  border-top: 1px solid #6e6e7c;
  border-bottom: 1px solid #6e6e7c;

  &:hover {
    background-color: #62626d;
    color: #ffffff;
    text-decoration: none;
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
    header: "Resources",
    sections: [
      { title: "", items: resources },
      { title: "Connect", items: connects },
    ],
  },
];

const MobileMenu = () => {
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
      <DirectLink
        href={process.env.NEXT_PUBLIC_CONSOLE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Go to Console
      </DirectLink>
    </Wrapper>
  );
};

export default MobileMenu;
