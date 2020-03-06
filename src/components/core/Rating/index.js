import React, { useContext, useState } from "react";
import styled from "@emotion/styled";

import Star from "./star";
import { RATES } from "../../../constant";
import { RatingContext } from "../../../contexts";

const Wrapper = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
  margin: ${({ margin }) => (margin ? "50px 0 0 auto" : "none")};

  @media (max-width: 768px) {
    display: none;
  }
`;

const Label = styled.label`
  font-family: "Source Sans Pro";
  margin: ${({ margin }) => (margin ? "0px 10px 5px 0" : "6px 10px 5px 0")};
  font-size: 14px;
  color: gray;
`;

const Rating = ({ margin = false, label }) => {
  const { selectedStar, saveRating } = useContext(RatingContext);
  const [hoverStar, setHoverStar] = useState(-1);

  return (
    <Wrapper margin={margin}>
      <Label margin={margin}>{label}</Label>
      {RATES.map((r, i) => {
        const isHover = hoverStar > i - 1;
        const isSelected = selectedStar > i - 1;
        const isRated = selectedStar === i;

        return (
          <Star
            key={r}
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
