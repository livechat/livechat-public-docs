import React from "react";
import Link from "next/link";
import { string } from "prop-types";
import styled from "@emotion/styled";
import { ArticleIcon } from "../icons";

const LinkWrapper = styled.div`
  padding: 8px 16px;
  margin-right: 10px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "500")};
  background-color: ${({ isActive }) => (isActive ? "#F6F6F7" : "")};
  display: flex;
  align-items: center;
  font-size: 14px;
  border-radius: 0px 8px 8px 0px;
  &:hover {
    font-weight: 600;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
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

const MenuItem = ({ link, pathname, iconFill, title }) => {
  return (
    <Link href={link}>
      <StyledLink>
        <LinkWrapper isActive={pathname + "/" === link}>
          <IconWrapper>
            <ArticleIcon fill="#ABABB1" />
          </IconWrapper>
          {title}
        </LinkWrapper>
      </StyledLink>
    </Link>
  );
};

MenuItem.propTypes = {
  link: string,
  pathname: string,
  title: string,
};

export default MenuItem;
