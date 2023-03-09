import { string, func, bool } from "prop-types";
import { Icon, Loader } from "@livechat/design-system";
import styled from "@emotion/styled";

import CheckCircleOutline from "react-material-icon-svg/dist/CheckCircleOutline";
import AlertCircleOutline from "react-material-icon-svg/dist/AlertCircleOutline";

import ActionButton from "./ActionButton";
import { MagicIcon } from "assets/icons/Magic";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 15px;
  span {
    display: flex;
  }
`;

const StatusIndicator = ({
  isLoading,
  error,
  success,
  getResponse,
  handleClose,
  prompt,
}) => {
  if (isLoading) {
    return (
      <Wrapper>
        <Loader size="small" />
        Loading...
      </Wrapper>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <Icon source={AlertCircleOutline} iconType="error" />
        <span>{error}</span>
        <ActionButton handleClick={handleClose} label="Cancel" />
      </Wrapper>
    );
  }
  if (success) {
    return (
      <Wrapper>
        <Icon source={CheckCircleOutline} iconType="success" />
        <span>Text successfully transformed.</span>
        <ActionButton handleClick={handleClose} label="Cancel" />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Icon source={MagicIcon} />
      <span>Do you want to rephrase the selected text?</span>
      <ActionButton handleClick={() => getResponse(prompt)} label="Confirm" />
      <ActionButton handleClick={handleClose} label="Cancel" />
    </Wrapper>
  );
};

StatusIndicator.propTypes = {
  isLoading: bool.isRequired,
  error: string.isRequired,
  success: bool.isRequired,
  getResponse: func.isRequired,
  handleClose: func.isRequired,
  prompt: string.isRequired,
};

export default StatusIndicator;
