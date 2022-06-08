import React from "react";
import { node } from "prop-types";
import { openChatWindow } from "../../utils";

const OpenChatLink = ({ children }) => {
  return (
    <a href="#open-chat" onClick={openChatWindow}>
      {children}
    </a>
  );
};

OpenChatLink.propTypes = {
  children: node,
};

export default OpenChatLink;
