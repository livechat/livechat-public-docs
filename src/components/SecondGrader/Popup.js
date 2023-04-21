import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "@emotion/styled";

import { canUseWindow } from "utils";

import Typewriter from "./Typewriter";
import StatusIndicator from "./StatusIndicator";
import BetaMark from "./BetaMark";

import Analytics from "utils/analytics";

const MIN_WORDS_LIMIT = 10;
const MAX_WORDS_LIMIT = 120;
const POPUP_OFFSET = 50;

const Container = styled.div`
  position: absolute;
  top: ${(props) => props.position}px;
  left: 40px;
  background-color: #ffffff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  width: calc(100% - 80px);
  z-index: 9;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

    if (words.length > MAX_WORDS_LIMIT) {
      setError(`Please select up to ${MAX_WORDS_LIMIT} words.`);
    }
    if (words.length < MIN_WORDS_LIMIT) {
      setError(`Please select at least ${MIN_WORDS_LIMIT} words.`);
    }
    const range = selection.getRangeAt(0);
    const containerPosition =
      range.getBoundingClientRect().bottom + window.pageYOffset - POPUP_OFFSET;

    setPrompt(selectedText);
    setPosition(containerPosition);
    setIsVisible(true);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleClose();
    }
  };

  const handleClose = () => {
    window.getSelection().removeAllRanges();
    setIsVisible(false);
    setPrompt("");
    setResponse("");
    setError("");
    setSuccess(false);
    Analytics.track({
      category: "Interaction",
      action: "Hide AI Assist",
      label: "AI Assist",
    });
  };

  const getResponse = async (prompt) => {
    try {
      Analytics.track({
        category: "Interaction",
        action: "Rephrase",
        label: "AI Assist",
      });
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NETLIFY_URL}/docs/api/openai/secondgrader`,
        {
          prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
      setResponse(res.data.result);
    } catch (err) {
      console.log(err);
      setError(err.response.statusText);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const article = document.querySelector("article");
    if (article) {
      article.addEventListener("mouseup", handleSelect);
    }

    return () => {
      if (article) {
        article.removeEventListener("mouseup", handleSelect);
      }
    };
  }, []);

  useEffect(() => {
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
        <BetaMark label="beta" container />
        <StatusIndicator
          isLoading={isLoading}
          error={error}
          success={success}
          prompt={prompt}
          getResponse={getResponse}
        />
      </Wrapper>
      {response && <Typewriter text={response} />}
    </Container>
  );
};

export default Popup;
