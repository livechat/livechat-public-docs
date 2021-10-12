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
  padding: 4px 16px 4px ${({ isSubItem }) => (isSubItem ? "20px" : "10px")};
  margin-right: 10px;
  font-weight: ${({ isActive }) => (isActive ? "600" : "500")};
  background-color: ${({ isActive }) => (isActive ? "#F6F6F7" : "")};
  font-size: 16px;
  border-radius: 0px 8px 8px 0px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({ isActive }) => (isActive ? "#5e6c78" : "#ABABB1")};
  &:hover {
    color: #5e6c78;
    cursor: pointer;
    text-decoration: none;
  }
`;

const ChevronWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
      <LinkWrapper isActive={pathname + "/" === link} isSubItem={false}>
        <Link href={link}>
          <StyledLink isActive={pathname + "/" === link}>
            <IconWrapper>
              <ArticleIcon fill={iconFill} />
            </IconWrapper>
            {title}
          </StyledLink>
        </Link>
        {items.length > 1 && isNotBasePath && (
          <ChevronWrapper isOpen={open} onClick={() => setOpen(!open)}>
            <ChevronRight
              fill={pathname + "/" === link ? "#5E6C78" : "#ABABB1"}
            />
          </ChevronWrapper>
        )}
      </LinkWrapper>
      {open &&
        items.map((item) => {
          return (
            <LinkWrapper
              isActive={pathname + "/" === item.link}
              isSubItem={true}
              key={item.link}
            >
              <Link href={item.link}>
                <StyledLink isActive={pathname + "/" === item.link}>
                  <IconWrapper>
                    <ArticleIcon fill={iconFill} />
                  </IconWrapper>
                  {item.title}
                </StyledLink>
              </Link>
            </LinkWrapper>
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
