import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import ArrowRight from "react-material-icon-svg/dist/ArrowRight";

import Dropdown from "./Dropdown";
import { HelpDeskIcon } from "../../../assets/icons/hd";
import { LiveChatIcon } from "../../../assets/icons/lc";

const Wrapper = styled.div`
  display: flex;

  > div {
    > a {
      &:hover {
        text-decoration: none;
      }
    }
  }
`;

const ProductsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  padding: 20px;
`;

const ProductWrapper = styled.div`
  color: #1b1b20;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 15px 20px;
  margin: 5px 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0px;
  border-radius: 15px;

  &:hover {
    background-color: #f6f6f7;
    cursor: pointer;
  }

  > svg {
    margin-right: 5px;
  }
`;

const VLine = styled.div`
  background-color: #f6f6f7;
  height: 450px;
  width: 1px;
  margin: 0 10px;
`;

const TitleWrapper = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: left;
  color: #808189;

  padding: 40px 40px 10px 25px;
`;

const LinkWrapper = styled.div`
  padding: 15px 20px;
  margin: 5px;
  border-radius: 15px;

  &:hover {
    background-color: #f6f6f7;
    cursor: pointer;
  }
`;

const LinkTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #1b1b20;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const LinkDescription = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.4px;
  color: #767680;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const ActionLink = styled.a`
  text-decoration: none;
  font-style: normal;
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
    cursor: pointer;
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

const DocsLink = ({ to, title, description }) => (
  <Link href={to}>
    <a>
      <LinkWrapper>
        <LinkTitle>{title}</LinkTitle>
        <LinkDescription>{description}</LinkDescription>
      </LinkWrapper>
    </a>
  </Link>
);

const Products = () => {
  return (
    <Dropdown label="Products">
      <Wrapper>
        <ProductsWrapper>
          <ProductWrapper>
            <LiveChatIcon />
            LiveChat
          </ProductWrapper>
          <ProductWrapper>
            <HelpDeskIcon />
            HelpDesk
          </ProductWrapper>
        </ProductsWrapper>
        <VLine />
        <div>
          <TitleWrapper>WHERE TO START?</TitleWrapper>
          <DocsLink
            to="/"
            title="LiveChat Accounts"
            description="A service for all products."
          />
          <DocsLink
            to="/"
            title="Building apps"
            description="How to build Platform apps."
          />
          <DocsLink
            to="/"
            title="Authorizing API calls"
            description="The fundamentals of LiveChat authorization."
          />
        </div>
      </Wrapper>
      <ActionLink
        href="https://accounts.livechat.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Create a developer account
        <ArrowRight />
      </ActionLink>
    </Dropdown>
  );
};

export default Products;
