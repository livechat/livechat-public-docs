/** @jsx jsx */ import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";
import { Button, ModalBase } from "@livechat/design-system";
import { LoginIcon } from "assets/icons/LoginIcon";
import { logAmplitudeEvent } from "../../../utils";

const modalBaseCss = css`
  width: 600px;
  padding: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .lc-modal-base__close {
    right: 12px;
    top: 12px;
  }
  h2 {
    font-size: 24px;
  }
  p {
    font-size: 15px;
    line-height: 22px;
    font-weight: 400;
    letter-spacing: normal;
  }
`;

const ButtonsWrapper = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-between;
`;

const LoginModal = ({ authorize, isOpen, handleModalClose, setBookmark }) => {
  const onModalClose = () => {
    if (isOpen) {
      handleModalClose();
    }
  };
  const onLoginProceed = () => {
    logAmplitudeEvent("loginAttempted");
    authorize();
    handleModalClose();
    setBookmark(true);
  };

  return (
    <ModalBase onClose={onModalClose} css={modalBaseCss}>
      <LoginIcon />
      <h2>Log in to add bookmarks</h2>
      <p>You need to be logged in to bookmark documents.</p>
      <ButtonsWrapper>
        <Button
          onClick={() => {
            handleModalClose();
          }}
          kind="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onLoginProceed();
          }}
          kind="primary"
        >
          Login
        </Button>
      </ButtonsWrapper>
    </ModalBase>
  );
};

export default LoginModal;
