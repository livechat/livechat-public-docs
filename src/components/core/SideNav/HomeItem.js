import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import Home from "react-material-icon-svg/dist/Home";

const HomeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 768px) {
    display: none;
  }
`;

const LinkWrapper = styled.div`
  padding: 4px 14px;
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const StyledLink = styled.a`
  width: 100%;
  color:#62626D;
  &:hover {
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
              <Home  fill="#62626D"height="20px" />
            </IconWrapper>
            Home
          </LinkWrapper>
        </StyledLink>
      </Link>
    </HomeIconWrapper>
  );
};

export default HomeItem;
