import React from "react";
import { useState } from "react";
import styled from "@emotion/styled";

import Star from "./star";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { logAmplitudeEvent } from "../../../utils/index";
import { RATES } from "../../../constant";

const Wrapper = styled.span`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-family: "Source Sans Pro", "Helvetica Neue", "Helvetica", "Roboto",
    sans-serif;
  margin-right: 10px;
  font-size: 14px;
  font-weight: normal;
  color: gray;
`;

const Rating = () => {
  const [ratings, setRatings] = useLocalStorage("ratings", []);
  const currentRating = ratings.find(
    rating => rating.pathname === window.location.pathname
  );
  const [selectedIndex, setSelectedIndex] = useState(
    currentRating ? currentRating.rating : -1
  );
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const saveRatings = (rating, text) => {
    const newRatings = ratings.filter(
      r => r.pathname !== window.location.pathname
    );
    const newRating = {
      rating,
      pathname: window.location.pathname
    };
    newRatings.push(newRating);
    setRatings(newRatings);
    setSelectedIndex(rating);

    logAmplitudeEvent("Document rated", {
      pathname: newRating.pathname,
      rating: newRating.rating,
      text
    });
  };

  return (
    <Wrapper>
      <Label>Rate this page:</Label>
      {RATES.map((r, i) => (
        <Star
          key={r}
          handleMouseEnter={() => setHoveredIndex(i)}
          handleMouseLeave={() => setHoveredIndex(-1)}
          handleClick={() => saveRatings(i, RATES[i])}
          hovered={hoveredIndex > i - 1}
          rated={selectedIndex === i}
          selected={selectedIndex > i - 1}
          text={RATES[i]}
        />
      ))}
    </Wrapper>
  );
};

export default Rating;
