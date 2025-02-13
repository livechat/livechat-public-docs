import React, { useState } from "react";
import AccountCircleOutline from "react-material-icon-svg/dist/DotsVertical";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Dropdown, DropdownList } from "@livechat/design-system";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  margin-left: auto;
  height: 60px;
  cursor: pointer;
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    width: 60px;
  }
`;

const dropdownCss = () => css`
  opacity: 1 !important;
  pointer-events: auto !important;
  transform: none !important;
  max-width: none;
  display: none;

  @media (min-width: 768px) {
    display: block !important;
    right: 5px !important;
    left: auto !important;
    top: 70px !important;
    width: 230px;
    border-top: none;
    border-radius: 8px;
  }
`;

const linkCss = () => css`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
  text-decoration: none;
  width: 100%;
  height: 100%;
  display: block;

  &:hover {
    text-decoration: none;
    color: #1b1b20;
  }

  @media (min-width: 768px) {
    color: #1b1b20;
  }
`;

const dropdownListCss = () => css`
  background-color: #4a4a55;
  width: 100%;

  @media (min-width: 768px) {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 8px;
    font-family: "Inter", sans-serif;
  }

  .lc-dropdown__list-item {
    margin: 0;
    cursor: default;
    width: 100%;
    padding: 7px 12px;

    &:hover {
      background-color: #ececec;
      cursor: pointer;
      border-radius: 8px;
    }
  }

  .lc-dropdown__list-item__content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .lc-dropdown__list-item--focused {
    background-color: #4a4a55;
    @media (min-width: 768px) {
      background-color: #ffffff;
    }
  }
`;

const iconCss = () => css`
  cursor: pointer;

  &:hover {
    background-color: #63636e;
    border-radius: 8px;
    transition: background-color 0.3s ease-in-out;
  }
`;

const ActionMenu = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => setIsVisible(false);
  const handleTriggerClick = () => setIsVisible(!isVisible);

  const listItems = [
    {
      itemId: 2,
      content: (
        <a
          href={process.env.NEXT_PUBLIC_CONSOLE_URL}
          css={linkCss}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
        >
          Go to Console
        </a>
      ),
    },
    {
      itemId: 3,
      content: (
        <a
          href={process.env.NEXT_PUBLIC_DISCORD_DROPDOWN_URL}
          css={linkCss}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
        >
          Join our Discord
        </a>
      ),
    },
    {
      itemId: 4,
      content: (
        <a
          href={process.env.NEXT_PUBLIC_AGENT_APP_URL}
          css={linkCss}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
        >
          Go to LiveChat App
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      isVisible={isVisible}
      placement="bottom-start"
      onClose={handleClose}
      css={dropdownCss}
      triggerRenderer={({ ref }) => (
        <Wrapper ref={ref}>
          <AccountCircleOutline
            fill="#ffffff"
            width="30px"
            height="30px"
            onClick={handleTriggerClick}
            css={iconCss}
          />
        </Wrapper>
      )}
    >
      <DropdownList items={listItems} css={dropdownListCss} />
    </Dropdown>
  );
};

export default ActionMenu;
