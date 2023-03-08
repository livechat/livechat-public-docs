import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { PopperTooltip, Switch } from "@livechat/design-system";

import BetaMark from "./BetaMark";
import Popup from "./Popup";

import { useLocalStorage } from "hooks";
import { MagicIcon } from "assets/icons/Magic";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CustomSwitch = styled(Switch)`
  span.lc-switch__track--enabled {
    background: linear-gradient(245deg, #8609ff, #0066ff);
  }
`;

const Tooltip = styled.div`
  font-size: 14px;
`;

const SecondGrader = () => {
  const [isEnable, setIsEnable] = useLocalStorage("ai_assist", true);

  const renderIcon = () => {
    return (
      <div>
        <MagicIcon />
      </div>
    );
  };

  const handleOnChange = () => setIsEnable(!isEnable);

  return (
    <Fragment>
      <Wrapper>
        <PopperTooltip
          trigger={renderIcon()}
          theme="invert"
          zIndex={999}
          placement="bottom-start"
        >
          <Tooltip>
            Use AI Assist to rephrase complicated paragraphs. Select between
            10-100 words.
          </Tooltip>
        </PopperTooltip>
        <BetaMark label="AI ASSIST" />
        <CustomSwitch size="compact" onChange={handleOnChange} on={isEnable} />
      </Wrapper>
      {isEnable && <Popup />}
    </Fragment>
  );
};

export default SecondGrader;
