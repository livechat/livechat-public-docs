import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import categories from "../../../configs/categories";
import { CategoryIcon } from "../icons";

const Wrapper = styled.div`
  padding-top: 10px;
  height: 100%;
  width: 100%;
  position: fixed;
  @media (min-width: 420px) {
    width: 240px;
  }
`;

const LinkWrapper = styled.div`
  padding: 8px 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
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

const iconStyle = {
  marginRight: "5px",
  marginBottom: "1px",
  position: "relative",
  top: "0px",
  bottom: "0px",
  right: "0px",
  left: "0px",
  width: "15px",
  height: "15px",
};

const CategoryMenu = () => {
  return (
    <Wrapper>
      {categories.map((category) => {
        return (
          <Link href={"/" + category.slug} key={category.key}>
            <StyledLink>
              <LinkWrapper>
                <IconWrapper>
                  <CategoryIcon category={category.slug} style={iconStyle} />
                </IconWrapper>
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
