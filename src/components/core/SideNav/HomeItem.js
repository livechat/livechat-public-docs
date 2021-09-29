import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { HomeIcon } from "../icons";

const HomeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 420px) {
    display: none;
  }
`;

const LinkWrapper = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLink = styled.a`
  width: 100%;
  color: #5e6c78;
  &:hover {
    color: #5e6c78;
    cursor: pointer;
    text-decoration: none;
    background-color: #f6f6f7;
  }
`;

const HomeItem = () => {
  return (
    <HomeIconWrapper>
      <Link href="/">
        <StyledLink>
          <LinkWrapper>
            <IconWrapper>
              <HomeIcon width="20px" height="25px" />
            </IconWrapper>
            Home
          </LinkWrapper>
        </StyledLink>
      </Link>
    </HomeIconWrapper>
  );
};

export default HomeItem;
