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
    </Wrapper>
  );
};

export default MobileMenu;
