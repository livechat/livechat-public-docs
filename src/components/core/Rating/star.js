import React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { PopperTooltip } from "@livechat/design-system";

import BlackStarIcon from "../../../assets/black-star.svg";
import BlueStarIcon from "../../../assets/blue-star.svg";

const Container = styled.div`
  cursor: pointer;
  margin-left: 4px;
`;

const StarIcon = styled(BlueStarIcon)`
  > path {
    fill: #0066ff;
  }

  :hover > path {
    fill: #004cbf;
  }
`;

const Star = ({ isHover, isSelected, isRated, text, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onMouseEnter = () => {
    props.handleMouseEnter();
    setIsVisible(true);
  };

  const onMouseLeave = () => {
    props.handleMouseLeave();
    setIsVisible(false);
  };

  return (
    <PopperTooltip
      zIndex={1}
      placement="bottom"
      triggerActionType="managed"
      isVisible={isVisible}
      trigger={
        <Container
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={props.handleClick}
        >
          {isHover || isSelected ? <StarIcon /> : <BlackStarIcon />}
        </Container>
      }
    >
      {isRated ? `You rated "${text}"` : text}
    </PopperTooltip>
  );
};

export default Star;
