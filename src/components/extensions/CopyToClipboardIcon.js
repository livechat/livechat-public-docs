import React, { useState } from "react";
import styled from "@emotion/styled";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "../core/icons";
import { logAmplitudeEvent } from "../../utils/index";

const CopyToClipboardWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  width: 45px;
`;

const CopyToClipboardAction = styled.div`
  position: relative;
  min-height: 18px;
`;

const CopyIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  text-align: right;
  max-width: 24px;
  opacity: ${({ isCopied }) => (isCopied ? 0 : 1)};
  transition-delay: ${({ isCopied }) => (isCopied ? "0" : "0.25")};
  transition: ${({ isCopied }) =>
    isCopied ? "none" : "opacity 0.25s ease-in-out"};
  :hover {
    cursor: ${({ isCopied }) => (isCopied ? "initial" : "pointer")};
  }
`;

const TextWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: right;
  text-transform: capitalize;
  line-height: 20px;
  font-size: 13px;
  justify-content: space-between;
  opacity: ${({ isCopied }) => (isCopied ? 1 : 0)};
  transition-delay: ${({ isCopied }) => (isCopied ? "0" : "0.25s")};
  transition: ${({ isCopied }) =>
    isCopied ? "opacity 0.25s ease-in-out" : "none"};
`;

const Text = styled.div`
  flex-grow: 2;
  max-width: 100%;
  overflow-x: auto;
`;

const CopyToClipboardIcon = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    console.log(text);
    logAmplitudeEvent("Copied to clipboard", {
      pathname: window.location.pathname,
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <CopyToClipboardWrapper>
      <CopyToClipboard onCopy={handleCopy} text={text}>
        <CopyToClipboardAction>
          <TextWrapper isCopied={isCopied}>
            <Text>Copied!</Text>
          </TextWrapper>

          <CopyIconWrapper isCopied={isCopied}>
            <CopyIcon />
          </CopyIconWrapper>
        </CopyToClipboardAction>
      </CopyToClipboard>
    </CopyToClipboardWrapper>
  );
};

export default CopyToClipboardIcon;
