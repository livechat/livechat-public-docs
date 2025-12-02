import React from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import Link from "next/link";

const StyledLink = styled.a`
  font-weight: 600;
  cursor: pointer;

  &:after {
    content: "";
    width: 16px;
    height: 16px;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 1px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' fill='%232200ff'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  }
`;

const SmallStyledLink = styled(StyledLink)`
  font-size: 14px;
`;

const SmallLinksSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const SmallLinksSectionHeader = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: #5e6c78;
  margin-bottom: 2px;
`;

const SmallLinksList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionLink = ({ to, href, children, ...rest }) => {
  if (href) {
    return (
      <Link href={href} target="_blank" {...rest}>
        <StyledLink>{children}</StyledLink>
      </Link>
    );
  }

  if (to) {
    return (
      <Link href={to} {...rest}>
        <StyledLink>{children}</StyledLink>
      </Link>
    );
  }

  return <StyledLink>{children}</StyledLink>;
};

SectionLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const SmallLinksSection = ({ header, links = [] }) => {
  const renderLink = ({ to, href, children, ...rest }, index) => {
    const url = href ?? to;
    const styled = <SmallStyledLink>{children}</SmallStyledLink>;

    return url ? (
      <Link
        key={index}
        href={url}
        {...rest}
        {...(href ? { target: "_blank" } : {})}
      >
        {styled}
      </Link>
    ) : (
      <SmallStyledLink key={index} {...rest}>
        {children}
      </SmallStyledLink>
    );
  };

  return (
    <SmallLinksSectionWrapper>
      {header && <SmallLinksSectionHeader>{header}</SmallLinksSectionHeader>}
      <SmallLinksList>{links.map(renderLink)}</SmallLinksList>
    </SmallLinksSectionWrapper>
  );
};

SmallLinksSection.propTypes = {
  header: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      href: PropTypes.string,
      children: PropTypes.node.isRequired,
    })
  ),
};

export default {
  SectionLink,
  SmallLinksSection,
};
