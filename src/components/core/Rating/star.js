import React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { PopperTooltip } from "@livechat/design-system";
import { StarIcon } from "../../core/icons";

const Container = styled.div`
  cursor: pointer;
  margin-left: 4px;
`;

const BlackStar = styled(StarIcon)`
  > path {
    fill: #ffffff;
    stroke: #0f0f10;
  }
`;

const BlueStar = styled(StarIcon)`
  > path {
    fill: #0066ff;
    stroke: #0066ff;

    :hover {
      fill: #004cbf;
      stroke: #004cbf;
    }
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
          {isHover || isSelected ? <BlueStar /> : <BlackStar />}
        </Container>
      }
    >
      {isRated ? `You rated "${text}"` : text}
    </PopperTooltip>
  );
};

export default Star;
