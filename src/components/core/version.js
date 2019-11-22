import React, { useState } from "react";
import styled from "@emotion/styled";
import { Dropdown, DropdownList, Button } from "@livechat/design-system";
import { api } from "../../constant";

const containerStyle = {
  marginTop: "10px",

  ".label": {
    marginRight: "10px"
  }
};

const labelStyle = {
  marginRight: "10px"
};

const StyledDropdownList = styled(DropdownList)`
  .lc-dropdown__list-item:first-of-type {
    margin-bottom: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .lc-dropdown__list-item:last-of-type {
    margin-bottom: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const Version = ({ redirectToVersion, selectedVersion }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const onDropdownHandle = version => {
    redirectToVersion(version);
  };

  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => setShowDropdown(false);

  const setContent = version => {
    return version === api.stableVersion
      ? `v${version} (stable)`
      : `v${version}`;
  };

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>API version</span>
      <Dropdown
        isVisible={showDropdown}
        onClose={closeDropdown}
        triggerRenderer={({ ref }) => (
          <Button onClick={openDropdown} ref={ref}>
            {selectedVersion}
            {selectedVersion === api.stableVersion && (
              <span style={{ fontWeight: 100, marginLeft: "3px" }}>
                (stable)
              </span>
            )}
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="#424d57"
              style={{ marginLeft: "5px", marginRight: "-10px" }}
            >
              <path d="M7 10l5 5 5-5H7z"></path>
            </svg>
          </Button>
        )}
      >
        <StyledDropdownList
          items={[3.1, 3.2].map((e, i) => ({
            itemId: i,
            content: setContent(e),
            onItemSelect: () => onDropdownHandle(e)
          }))}
        />
      </Dropdown>
    </div>
  );
};

export default Version;
