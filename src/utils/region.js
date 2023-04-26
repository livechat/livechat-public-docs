import { REGION } from "../constant";

const supportedRegions = Object.values(REGION);

export const getRegion = (token) => {
  const region = token?.split(":")[0];

  // See https://platform.text.com/docs/messaging/agent-chat-api/#data-centers
  if (supportedRegions.includes(region)) {
    return region;
  }

  return undefined;
};
