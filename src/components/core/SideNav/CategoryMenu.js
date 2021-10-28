import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import PlayCircleOutline from "react-material-icon-svg/dist/PlayCircleOutline";
import Lock from "react-material-icon-svg/dist/Lock";
import Forum from "react-material-icon-svg/dist/Forum";
import Laptop from "react-material-icon-svg/dist/Laptop";
import MessageProcessing from "react-material-icon-svg/dist/MessageProcessing";
import Cog from "react-material-icon-svg/dist/Cog";
import Poll from "react-material-icon-svg/dist/Poll";
import CurrencyUsd from "react-material-icon-svg/dist/CurrencyUsd";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  @media (min-width: 420px) {
    width: 260px;
  }
`;

const LinkWrapper = styled.div`
  padding: 6px 16px;
@media (min-width: 768px) {
  padding: 6px 20px;
  }
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  border-radius: 0px 8px 8px 0px;
  &:hover {
    background-color: #f6f6f7;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const StyledLink = styled.a`
  color: #5e6c78;
  &:hover {
    color: #5e6c78;
    cursor: pointer;
    text-decoration: none;
    background-color: #f6f6f7;
  }
`;

const categories = [
  {
    slug: "getting-started",
    title: "Getting Started",
    icon: <PlayCircleOutline fill="#424D57" />,
  },
  {
    slug: "authorization",
    title: "Authorization",
    icon: <Lock fill="#424D57" />,
  },
  {
    slug: "messaging",
    title: "Messaging",
    icon: <Forum fill="#424D57" />,
  },
  {
    slug: "extending-agent-app",
    title: "Agent App",
    icon: <Laptop fill="#424D57" />,
  },
  {
    slug: "extending-chat-widget",
    title: "Chat Widget",
    icon: <MessageProcessing fill="#424D57" />,
  },
  {
    slug: "management",
    title: "Management",
    icon: <Cog fill="#424D57" />,
  },
  {
    slug: "data-reporting",
    title: "Reporting",
    icon: <Poll fill="#424D57" />,
  },
  {
    slug: "monetization",
    title: "Monetization",
    icon: <CurrencyUsd fill="#424D57" />,
  },
];

const CategoryMenu = () => {
  return (
    <Wrapper>
      {categories.map((category) => {
        return (
          <Link href={"/" + category.slug} key={category.slug}>
            <StyledLink>
              <LinkWrapper>
                <IconWrapper>{category.icon}</IconWrapper>
                {category.title}
              </LinkWrapper>
            </StyledLink>
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default CategoryMenu;
