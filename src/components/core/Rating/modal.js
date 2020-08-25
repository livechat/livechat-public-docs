import React, { useState } from "react";
import { Loader, ModalBase } from "@livechat/design-system";
import styled from "@emotion/styled";

const ModalCss = styled.div`
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
  background-color: "white";
  opacity: ${(props) => props.isLoading ? "1.0" : "0"};
`

const FeedbackModal = ({ isOpen, handleModalClose }) => {

  const [isLoading, setIsLoading] = useState(true);
  const hideLoader = () => {
    setIsLoading(false);
  }

  const onModalClose = () => {
    if (isOpen) {
      handleModalClose();
    }
  }

  return (
    <div>
      <ModalBase
        onClose={onModalClose}
        style={{ width: "600px", height: "600px" }}
      >
        {isLoading
          ? <ModalCss isLoading={isLoading}><Loader size="large" /></ModalCss>
          : null}
        <iframe onLoad={hideLoader} title="feedback-form" src="https://docs.google.com/forms/d/e/1FAIpQLSfcJbrIHOgSqvLVQB_EC1ao70AGDiBun06k7PtEsjmbycymwg/viewform?embedded=true" width="580" height="550" frameBorder="0" marginHeight="0" marginWidth="0"></iframe>
      </ModalBase >
    </div >
  )
};

export default FeedbackModal;
