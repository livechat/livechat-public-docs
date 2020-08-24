import React from "react";
import { ModalBase } from "@livechat/design-system";

const FeedbackModal = ({ isOpen, handleModalClose }) => {

  const onModalClose = () => {
    if (isOpen) {
      handleModalClose();
    }
  }

  return (
    <div>
      <ModalBase
        onClose={onModalClose}
        style={{ width: "700px", height: "500px" }}
      >
        <div style={{ margin: 'auto' }}><iframe title="feedback-form" src="https://docs.google.com/forms/d/e/1FAIpQLSfcJbrIHOgSqvLVQB_EC1ao70AGDiBun06k7PtEsjmbycymwg/viewform?embedded=true" width="640" height="401" frameBorder="0" marginHeight="0" marginWidth="0">Loading…</iframe></div>
      </ModalBase>
    </div>
  )
};

export default FeedbackModal;



