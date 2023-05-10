import React, { useState } from "react";
import { string, array, node } from "prop-types";
import styled from "@emotion/styled";
import Link from "next/link";
import ChevronDown from "react-material-icon-svg/dist/ChevronDown";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  ${({ isOpen }) => isOpen && `background-color: #62626D;`};

  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  padding: 26px 24px;
  border-top: 1px solid #6e6e7c;
  border-bottom: 1px solid #6e6e7c;
`;

const Chevron = styled(ChevronDown)`
  ${({ isOpen }) => isOpen && `transform: rotate(180deg)`};
  transition: transform 0.5s;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
`;

const Subtitle = styled.div`
  color: #e2e2e4;
  font-weight: 500;
  font-size: 12px;
  line-height: 28px;
  padding: 16px 0px 0px 24px;
`;

const ExternalLink = styled.a`
  &:hover {
    text-decoration: none;
  }
`;

const LinkTitle = styled.div`
  padding: 16px 24px;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  font-weight: 500;
  border-bottom: 1px solid #6e6e7c;

  display: flex;
  align-items: center;
  gap: 8px;
`;

const LinkElement = ({ title, to, icon }) => {
  const body = (
    <LinkTitle>
      {icon}
      {title}
    </LinkTitle>
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

LinkElement.propTypes = {
  title: string.isRequired,
  to: string.isRequired,
  icon: node,
};

const MenuItem = ({ copy, items, sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Wrapper onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        {copy}
        <Chevron fill="#ffffff" height="24px" width="24px" isOpen={isOpen} />
      </Wrapper>

      {isOpen && (
        <LinksWrapper>
          {items
            ? items.map((item) => (
                <LinkElement
                  key={`${item.title}`}
                  title={item.title}
                  to={item.link}
                  icon={item.secondaryIcon}
                />
              ))
            : sections.map((item) => (
                <>
                  {item?.title && <Subtitle>{item.title}</Subtitle>}

                  {item.items.map((element) => (
                    <LinkElement
                      key={`${element.title}`}
                      title={element.title}
                      to={element.link}
                      icon={element.secondaryIcon}
                    />
                  ))}
                </>
              ))}
        </LinksWrapper>
      )}
    </div>
  );
};

MenuItem.propTypes = {
  copy: string.isRequired,
  items: array,
  sections: array,
};

export default MenuItem;
