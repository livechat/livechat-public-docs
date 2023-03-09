import React, { useState, useEffect } from "react";
import { string } from "prop-types";

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText((prevText) => {
        const nextChar = text[currentIndex];
        currentIndex++;
        return `${prevText}${nextChar}`;
      });
      if (currentIndex === text.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [text]);

  return <div>{displayText}</div>;
};

Typewriter.propTypes = {
  text: string.isRequired,
};

export default Typewriter;
