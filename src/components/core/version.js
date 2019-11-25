import React, { useState } from "react";
import styled from "@emotion/styled";
import { Dropdown, DropdownList, Button } from "@livechat/design-system";
import constants from "../../constant";

const containerStyle = (expanded = true) => ({
  padding: "9px 10px 8px 50px",
  backgroundColor: "white",
  borderBottom: "solid 1px #e8e8e8",
  position: "fixed",
  width: "100%",
  left: expanded ? "249px" : "0",
  zIndex: 40,
  paddingBottom: "7px",
  transition: "left 0.3s ease-out",

  ".label": {
    marginRight: "10px"
  }
});

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

const Version = ({ redirectToVersion, selectedVersion, expanded }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  console.log(expanded);

  const onDropdownHandle = version => {
    redirectToVersion(version);
    setShowDropdown(false);
  };

  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => setShowDropdown(false);

  const setContent = version => {
    return version === constants.api.stableVersion
      ? `v${version} (stable)`
      : `v${version}`;
  };

  return (
    <div style={containerStyle(expanded)}>
      <span style={labelStyle}>API version</span>
      <Dropdown
        isVisible={showDropdown}
        onClose={closeDropdown}
        triggerRenderer={({ ref }) => (
          <Button onClick={openDropdown} ref={ref}>
            {selectedVersion}
            {selectedVersion === constants.api.stableVersion && (
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
          items={constants.api.allVersions.map((e, i) => ({
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
