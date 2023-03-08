import { string, func, bool } from "prop-types";
import { Icon, Loader } from "@livechat/design-system";
import styled from "@emotion/styled";

import Check from "react-material-icon-svg/dist/Check";
import Close from "react-material-icon-svg/dist/Close";
import CheckCircleOutline from "react-material-icon-svg/dist/CheckCircleOutline";
import AlertCircleOutline from "react-material-icon-svg/dist/AlertCircleOutline";

import { MagicIcon } from "assets/icons/Magic";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 15px;
  span {
    display: flex;
    svg {
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;

const Button = styled.button`
  all: unset;
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
        {error}
      </Wrapper>
    );
  }
  if (success) {
    return (
      <Wrapper>
        <Icon source={CheckCircleOutline} iconType="success" />
        Text successfully transformed.
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Icon source={MagicIcon} />
      Would you like to rephrase selected text?
      <Button>
        <Icon
          source={Check}
          iconType="success"
          onClick={() => getResponse(prompt)}
        />
      </Button>
      <Button>
        <Icon source={Close} iconType="error" onClick={handleClose} />
      </Button>
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
