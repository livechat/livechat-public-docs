import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "@emotion/styled";

import { canUseWindow } from "utils";

import Typewriter from "./Typewriter";
import StatusIndicator from "./StatusIndicator";
import BetaMark from "./BetaMark";

const Container = styled.div`
  position: absolute;
  top: ${(props) => props.position}px;
  left: 40px;
  background-color: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
  width: calc(100% - 80px);
  z-index: 999;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg:hover {
    cursor: pointer;
  }
`;

const Popup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [position, setPosition] = useState(0);
  const [response, setResponse] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  const handleSelect = () => {
    if (!canUseWindow) {
      return;
    }

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText.length === 0) {
      return;
    }

    const words = selectedText.split(" ");
    if (words.length < 3) {
      return;
    }

    if (words.length > 100) {
      setError("Please select up to 100 words");
    }
    if (words.length < 10) {
      setError("Please select at least 10 words");
    }
    const range = selection.getRangeAt(0);
    const containerPosition =
      range.getBoundingClientRect().bottom + window.pageYOffset - 50;

    setPrompt(selectedText);
    setPosition(containerPosition);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
    setPrompt("");
    setResponse("");
    setError("");
    setSuccess(false);
  };

  const getResponse = async (prompt) => {
    try {
      setIsLoading(true);
      const res = await axios.post("api/openai/secondgrader", {
        prompt: prompt,
      });
      setSuccess(true);
      setResponse(res.data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleSelect);

    return () => {
      document.removeEventListener("mouseup", handleSelect);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  if (!isVisible) {
    return null;
  }

  return (
    <Container ref={ref} position={position}>
      <Wrapper>
        <StatusIndicator
          isLoading={isLoading}
          error={error}
          success={success}
          prompt={prompt}
          getResponse={getResponse}
          handleClose={handleClose}
        />
        <BetaMark label="beta" container />
      </Wrapper>
      <div>{response && <Typewriter text={response} />}</div>
    </Container>
  );
};

export default Popup;
