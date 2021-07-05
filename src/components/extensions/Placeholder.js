import React from "react";

const placeholders = {
  NUMBER_OF_CUSTOMERS: {
    type: "text",
    text: "32,000",
  },
  DEVELOPER_CONSOLE_URL: {
    type: "link",
    label: "Developer Console",
    url: "https://developers.livechat.com/console/",
  },
  LIVECHAT_HOME_URL: {
    type: "link",
    label: "LiveChat",
    url: "https://www.livechat.com",
  },
  LIVECHAT_MARKETPLACE_URL: {
    type: "link",
    label: "LiveChat Marketplace",
    url: "https://www.livechat.com/marketplace/",
  },
};

const Placeholder = ({ id }) => {
  const placeholder = placeholders[id];

  if (!placeholder) {
    return null;
  }

  switch (placeholder.type) {
    case "text":
      return <span>{placeholder.text}</span>;

    case "link":
      return (
        <a href={placeholder.url} target="_blank" rel="noopener noreferrer">
          {placeholder.label}
        </a>
      );

    default:
      return null;
  }
};

export default Placeholder;
