import React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { PopperTooltip } from "@livechat/design-system";

import BlackStarIcon from "../../../assets/black-star.svg";
import BlueStarIcon from "../../../assets/blue-star.svg";

const Container = styled.div`
  cursor: pointer;
`;

const StarIcon = styled(BlueStarIcon)`
  > path {
    fill: ${({ fill }) => fill};
  }
`;

const Star = ({ hovered, selected, rated, text, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const fillColor = hovered ? "#004cbf" : selected ? "#0066FF" : "";

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
          {hovered || selected ? (
            <StarIcon fill={fillColor} />
          ) : (
            <BlackStarIcon />
          )}
        </Container>
      }
    >
      {rated ? `You rated "${text}"` : text}
    </PopperTooltip>
  );
};

export default Star;
