import React from "react";
import { string, node, bool } from "prop-types";
import Link from "next/link";
import styled from "@emotion/styled";

import { ComingSoonIcon } from "assets/icons/cards/ComingSoon";

const LinkWrapper = styled.div`
  padding: 16px 20px;
  margin: 4px 16px;
  border-radius: 15px;
  width: 252px;
  &:hover {
    background-color: #f6f6f7;
    cursor: pointer;
  }
`;

const LinkTitle = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #1b1b20;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }

  > svg {
    margin-right: 8px;

    > rect {
      fill: #f6f6f7;
    }
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

const ExternalLink = styled.a`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const BadgeWrapper = styled.div`
  margin-left: 12px;
`;

const DropdownItem = ({ to, title, description, image, badge }) => {
  const body = (
    <LinkWrapper>
      <LinkTitle>
        {image}
        {title}
        <BadgeWrapper>{badge && <ComingSoonIcon />}</BadgeWrapper>
      </LinkTitle>
      <LinkDescription>{description}</LinkDescription>
    </LinkWrapper>
  );

  if (to.startsWith("https://")) {
    return (
      <ExternalLink href={to} target="_blank" rel="noopener noreferrer">
        {body}
      </ExternalLink>
    );
  }

  return <Link href={to}>{body}</Link>;
};

DropdownItem.propTypes = {
  to: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  image: node,
  badge: bool,
};

export default DropdownItem;
