import React, { useContext, useState } from "react";
import styled from "@emotion/styled";

import Star from "./star";
import { RATES } from "../../../constant";
import { RatingContext } from "../../../contexts";

const Wrapper = styled.div`
  height: 25px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Label = styled.label`
  font-family: "Source Sans Pro";
  font-size: 14px;
  color: gray;
`;

const Rating = ({ label, className }) => {
  const { selectedStar, saveRating } = useContext(RatingContext);
  const [hoverStar, setHoverStar] = useState(-1);

  return (
    <Wrapper className={className}>
      <Label>{label}</Label>
      {RATES.map((rate, i) => {
        const isHover = hoverStar > i - 1;
        const isSelected = selectedStar > i - 1;
        const isRated = selectedStar === i;

        return (
          <Star
            key={rate}
            handleMouseEnter={() => setHoverStar(i)}
            handleMouseLeave={() => setHoverStar(-1)}
            handleClick={() => saveRating(i)}
            isHover={isHover}
            isSelected={isSelected}
            isRated={isRated}
            text={RATES[i]}
          />
        );
      })}
    </Wrapper>
  );
};

export default Rating;
