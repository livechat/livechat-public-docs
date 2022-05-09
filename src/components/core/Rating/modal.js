import { useState } from "react";
import { Loader, ModalBase } from "@livechat/design-system";
/** @jsxImportSource @emotion/core */
import { jsx, css } from "@emotion/core";
import styled from "@emotion/styled";

const modalBaseCss = css`
  width: 610px;
  padding: 22px 10px 15px 15px;

  .lc-modal-base__close {
    right: 12px;
    top: 12px;
  }
`;

const iframeCss = css`
  margin-bottom: 0;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  margin: auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #ffffff;
`;

const FeedbackModal = ({ isOpen, handleModalClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const hideLoader = () => {
    setIsLoading(false);
  };

  const onModalClose = () => {
    if (isOpen) {
      handleModalClose();
    }
  };

  return (
    <ModalBase onClose={onModalClose} css={modalBaseCss}>
      {isLoading && (
        <LoaderWrapper>
          <Loader size="large" />
        </LoaderWrapper>
      )}
      <iframe
        onLoad={hideLoader}
        title="feedback-form"
        src="https://docs.google.com/forms/d/e/1FAIpQLSfcJbrIHOgSqvLVQB_EC1ao70AGDiBun06k7PtEsjmbycymwg/viewform?embedded=true"
        width="580"
        height="630"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        css={iframeCss}
      ></iframe>
    </ModalBase>
  );
};

export default FeedbackModal;
