import React, { useState } from "react";
import AccountCircleOutline from "react-material-icon-svg/dist/AccountCircleOutline";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Dropdown, DropdownList } from "@livechat/design-system";

import { logAmplitudeEvent } from "../../../utils";
import { useAuth } from "../../../contexts/auth";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  align-self: flex-end;
  margin-left: auto;
  height: 60px;
  width: 40px;
  cursor: pointer;

  @media (min-width: 768px) {
    margin-right: 20px;
    width: 60px;
  }
`;

const dropdownCss = () => css`
  opacity: 1 !important;
  right: 0 !important;
  top: 60px !important;
  width: 100vw;
  z-index: 100;
  display: block !important;
  pointer-events: auto !important;
  transform: none !important;
  max-width: none;
  border-top: 1px solid #ffffff;

  @media (min-width: 768px) {
    right: 5px !important;
    left: auto !important;
    top: 70px !important;
    width: 230px;
    border-top: none;
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
  }

  .lc-dropdown__list-item {
    margin: 0 10px;
    cursor: default;
    width: 100%;
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

const profilePhotoCss = () => css`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  vertical-align: middle;
  margin: 0;
`;

const iconCss = () => css`
  cursor: pointer;
`;

const ProfileItemWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  pointer-events: none;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    > div:first-of-type {
      font-weight: 500;
      font-size: 12px;
      line-height: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;

      @media (min-width: 768px) {
        width: 150px;
      }
    }

    > div:last-of-type {
      font-weight: 400;
      font-size: 10px;
      line-height: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;

      @media (min-width: 768px) {
        width: 150px;
      }
    }
  }

  &:hover {
    background-color: #ffffff;
  }

  color: #ffffff;
  @media (min-width: 768px) {
    color: #1b1b20;
  }
`;

const LoggingItemWrapper = styled.div`
  color: #ffffff;
  cursor: pointer;

  @media (min-width: 768px) {
    color: #1b1b20;
  }
`;

const Profile = () => {
  const { authorize, isAuthorized, logout, user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const { name, avatar_url, email } = user;

  const handleClose = () => setIsVisible(false);
  const handleTriggerClick = () => setIsVisible(!isVisible);

  const listItems = [
    {
      itemId: 1,
      content: (
        <ProfileItemWrapper>
          {!avatar_url || avatar_url === "" ? (
            <AccountCircleOutline fill="#1b1b20" width="30px" height="30px" />
          ) : (
            <img src={avatar_url} alt="photo" css={profilePhotoCss} />
          )}
          <div>
            <div>{name}</div>
            <div>{email}</div>
          </div>
        </ProfileItemWrapper>
      ),
      divider: true,
    },
    {
      itemId: 2,
      content: (
        <a
          href="https://developers.livechat.com/console/"
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
          href="https://my.livechatinc.com/"
          css={linkCss}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
        >
          Go to LiveChat App
        </a>
      ),
      divider: true,
    },
    {
      itemId: 4,
      content: (
        <LoggingItemWrapper>
          {isAuthorized ? `Log out` : `Log in`}
        </LoggingItemWrapper>
      ),
      onItemSelect: () => {
        if (isAuthorized) {
          logout();
        } else {
          logAmplitudeEvent("loginAttempted");
          authorize();
        }
        handleClose();
      },
    },
  ];

  if (!name && !email) {
    listItems.shift();
  }

  return (
    <Dropdown
      isVisible={isVisible}
      placement="bottom-start"
      onClose={handleClose}
      css={dropdownCss}
      triggerRenderer={({ ref }) => (
        <Wrapper ref={ref}>
          {!avatar_url || avatar_url === "" ? (
            <AccountCircleOutline
              fill="#ffffff"
              width="30px"
              height="30px"
              onClick={handleTriggerClick}
              css={iconCss}
            />
          ) : (
            <img
              src={avatar_url}
              alt="photo"
              css={profilePhotoCss}
              onClick={handleTriggerClick}
            />
          )}
        </Wrapper>
      )}
    >
      <DropdownList items={listItems} css={dropdownListCss} />
    </Dropdown>
  );
};

export default Profile;
