import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { Dropdown, DropdownList, Button } from "@livechat/design-system";
// import { api } from "../../constant";

export const api = {
  stableVersion: 3.1,
  unstableVersions: [3.2]
};

const firstItemStyle = {
  marginBottom: "0",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px"
};

const lastItemStyle = {
  marginBottom: "0",
  borderBottomLeftRadius: "5px",
  borderBottomRightRadius: "5px"
};

const containerStyle = {
  marginTop: "10px",

  ".label": {
    marginRight: "10px"
  }
};

const labelStyle = {
  marginRight: "10px"
};

const Version = ({ setApiVersion, subcategory }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(api.stableVersion);

  useEffect(() => {
    const pathname = window.location.pathname;
    api.unstableVersions.some(e => {
      if (pathname.includes(e)) {
        setSelectedVersion(e);
      }
    });
  }, []);

  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => setShowDropdown(false);
  const setVersion = version => {
    closeDropdown();
    setSelectedVersion(version);
    setApiVersion(version);

    const pathname = window.location.pathname;

    if (!(selectedVersion === version)) {
      if (selectedVersion === api.stableVersion) {
        navigate(pathname.replace(subcategory, `${subcategory}/v${version}`));
      } else {
        if (version === api.stableVersion) {
          navigate(
            pathname.replace(`${subcategory}/v${selectedVersion}`, subcategory)
          );
        } else {
          navigate(
            pathname.replace(
              `${subcategory}/v${selectedVersion}`,
              `${subcategory}/v${version}`
            )
          );
        }
      }
    }
  };

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>API version</span>
      <Dropdown
        isVisible={showDropdown}
        onClose={closeDropdown}
        triggerRenderer={({ ref }) => (
          <Button onClick={openDropdown} ref={ref}>
            {selectedVersion || "Version"}
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
        <DropdownList
          items={[
            {
              itemId: 0,
              content: "v3.1",
              onItemSelect: () => setVersion(3.1),
              style: firstItemStyle
            },
            {
              itemId: 1,
              content: "v3.2",
              onItemSelect: () => setVersion(3.2),
              style: lastItemStyle
            }
          ]}
        />
      </Dropdown>
    </div>
  );
};

export default Version;
