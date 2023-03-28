import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { PopperTooltip, Switch } from "@livechat/design-system";

import BetaMark from "./BetaMark";
import Popup from "./Popup";

import { useLocalStorage } from "hooks";
import { MagicIcon } from "assets/icons/Magic";

import Analytics from "utils/analytics";

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

const TooltipContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: ${(props) => (props.isEnabled ? 1 : 0.6)};
  svg {
    width: 17px;
    height: 16px;
  }
`;

const SecondGrader = () => {
  const [isEnabled, setIsEnabled] = useLocalStorage("ai_assist", false);
  const actionEvent = isEnabled ? "Switch off" : "Switch on";

  const renderTooltip = () => {
    return (
      <TooltipContainer isEnabled={isEnabled}>
        <MagicIcon />
        <BetaMark label="AI ASSIST" />
      </TooltipContainer>
    );
  };

  const handleOnChange = () => {
    setIsEnabled(!isEnabled);
    Analytics.track({
      category: "Interaction",
      action: `${actionEvent}`,
      label: "AI Assist",
    });
  };

  return (
    <Fragment>
      <Wrapper>
        <PopperTooltip
          trigger={renderTooltip()}
          theme="invert"
          zIndex={999}
          placement="bottom-start"
        >
          <Tooltip>
            AI Assist explains selected text in simpler words. Select 10-120
            words.
          </Tooltip>
        </PopperTooltip>
        <CustomSwitch
          size="compact"
          onChange={handleOnChange}
          on={isEnabled}
          data-controller="track"
          data-track-category="Interaction"
          data-track-action={actionEvent}
          data-track-label="AI Assist"
          data-action="track#send"
        />
      </Wrapper>
      {isEnabled && <Popup />}
    </Fragment>
  );
};

export default SecondGrader;
