import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { GettingStartedIcon } from "assets/icons/cards/GettingStarted";
import { AuthorizationIcon } from "assets/icons/cards/Authorization";
import { MessagingIcon } from "assets/icons/cards/Messaging";
import { AgentAppSdkIcon } from "assets/icons/cards/AgentAppSDK";
import { ChatWidgetIcon } from "assets/icons/cards/ChatWidget";
import { ManagementIcon } from "assets/icons/cards/Management";
import { DataReportingIcon } from "assets/icons/cards/DataReporting";
import { MonetizationIcon } from "assets/icons/cards/Monetization";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  @media (min-width: 420px) {
    width: 260px;
    top: 110px;
  }
`;

const LinkWrapper = styled.div`
  padding: 6px 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  border-radius: 0px 8px 8px 0px;
  &:hover {
    background-color: #f6f6f7;
  }

  @media (min-width: 768px) {
    padding: 6px 20px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  > svg {
    > rect {
      fill: #f6f6f7;
    }
  }
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
    icon: <GettingStartedIcon />,
  },
  {
    slug: "authorization",
    title: "Authorization",
    icon: <AuthorizationIcon fill="#6BC5A8" />,
  },
  {
    slug: "messaging",
    title: "Messaging",
    icon: <MessagingIcon fill="#7A2CF5" />,
  },
  {
    slug: "extending-agent-app",
    title: "Agent App",
    icon: <AgentAppSdkIcon fill="#FE5000" />,
  },
  {
    slug: "extending-chat-widget",
    title: "Chat Widget",
    icon: <ChatWidgetIcon fill="#EAB23E" />,
  },
  {
    slug: "management",
    title: "Management",
    icon: <ManagementIcon fill="#2469F6" />,
  },
  {
    slug: "data-reporting",
    title: "Reporting",
    icon: <DataReportingIcon fill="#55B4E0" />,
  },
  {
    slug: "monetization",
    title: "Monetization",
    icon: <MonetizationIcon fill="#9061CC" />,
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
