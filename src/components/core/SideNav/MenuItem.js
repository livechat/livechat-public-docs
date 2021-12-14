import React, { useState } from "react";
import Link from "next/link";
import { string, bool } from "prop-types";
import styled from "@emotion/styled";
import ChevronRight from "react-material-icon-svg/dist/ChevronRight";
import { ArticleIcon } from "../icons";

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "500")};
  font-size: 16px;
  border-radius: 0px 8px 8px 0px;

  &:hover {
    background-color: #f6f6f7;
  }
`;

const LinkArea = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 16px 6px ${({ isSubItem }) => (isSubItem ? "30px" : "20px")};
  margin-right: 10px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "500")};
  font-size: 16px;
  border-radius: 0px 8px 8px 0px;
  width: 100%;

  &:hover {
    background-color: #f6f6f7;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({ isActive }) => (isActive ? "#328DFF" : "#62626D")};
  &:hover {
    color: #328dff;
    cursor: pointer;
    text-decoration: none;
  }
  width: 100%;
`;

const ChevronWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5px;
  transform: ${({ isOpen }) => (isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  transition: transform 300ms;
  cursor: pointer;
`;

const MenuItem = ({
  link,
  pathname,
  iconFill,
  title,
  items = [],
  isOpen = false,
  isNotBasePath,
}) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <>
      <LinkWrapper isActive={pathname + "/" === link}>
        <Link href={link}>
          <StyledLink isActive={pathname + "/" === link}>
            <LinkArea isSubItem={false}>
              <IconWrapper>
                <ArticleIcon fill={iconFill} />
              </IconWrapper>
              {title}
            </LinkArea>
          </StyledLink>
        </Link>
        {items.length > 1 && isNotBasePath && (
          <ChevronWrapper isOpen={open} onClick={() => setOpen(!open)}>
            <ChevronRight fill="#62626D" />
          </ChevronWrapper>
        )}
      </LinkWrapper>
      {open &&
        items.map((item) => {
          return (
            <Link href={item.link} key={item.link}>
              <StyledLink isActive={pathname + "/" === item.link}>
                <LinkArea
                  isActive={pathname + "/" === item.link}
                  isSubItem={true}
                >
                  <IconWrapper>
                    <ArticleIcon fill={iconFill} />
                  </IconWrapper>
                  {item.title}
                </LinkArea>
              </StyledLink>
            </Link>
          );
        })}
    </>
  );
};

MenuItem.propTypes = {
  link: string,
  pathname: string,
  title: string,
  iconFill: string,
  isSubItem: bool,
  hasSubItems: bool,
  isOpen: bool,
  isNotBasePath: bool,
};

export default MenuItem;
