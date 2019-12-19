import React, { useState } from "react";
import styled from "@emotion/styled";
import { Dropdown, DropdownList, Button } from "@livechat/design-system";
import { API } from "../../constant";
import { versionToString, getVersionColor } from "../../utils";

const Container = styled.div`
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(255, 255, 255);
  position: fixed;
  top: 0px;
  width: 100%;
  left: ${({ expanded }) => (expanded ? "249px" : "0")};
  z-index: 40;
  transition: left 0.3s ease-out;

  .label {
    margin-right: 10px;
  }

  @media (min-width: 768px) {
    top: 60px;
  }
`;

const Content = styled.div`
  padding: 9px 10px 7px 50px;
  background-color: ${({ bgColor }) => `${bgColor}`};
  border-bottom: ${({ borderColor }) => `solid 1px ${borderColor}`};
`;

const labelStyle = {
  marginRight: "10px"
};

const versionInfoStyle = {
  marginLeft: "10px"
};

const StyledDropdownList = styled(DropdownList)`
  .lc-dropdown__list-item {
    margin-bottom: 0;
  }

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

const Version = ({
  articleVersions,
  redirectToVersion,
  selectedVersion,
  expanded
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const onDropdownHandle = version => {
    redirectToVersion(version);
    setShowDropdown(false);
  };

  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => setShowDropdown(false);

  const formatVersion = version => {
    return (
      <>
        <span>{version}</span>
        <span style={{ fontWeight: 100, marginLeft: "3px" }}>
          {version === API.STABLE_VERSION
            ? `(stable)`
            : version === API.LEGACY_VERSION
            ? `(legacy)`
            : `(dev preview)`}
        </span>
      </>
    );
  };

  const sortedArticleVersions = articleVersions
    .map(e => parseFloat(e))
    .sort((a, b) => b - a)
    .map(e => versionToString(e));

  const versionColor = getVersionColor(selectedVersion);

  // Extra case for stable version to match the sidebar colors
  const isStable = selectedVersion === API.STABLE_VERSION;

  return (
    <Container expanded={expanded}>
      <Content
        bgColor={
          isStable ? "rgb(241, 246, 248)" : `rgba(${versionColor}, 0.07)`
        }
        borderColor={
          isStable ? "rgb(232, 232, 232)" : `rgba(${versionColor}, 0.07)`
        }
      >
        <span style={labelStyle}>API version</span>
        <Dropdown
          isVisible={showDropdown}
          onClose={closeDropdown}
          triggerRenderer={({ ref }) => (
            <Button onClick={openDropdown} ref={ref}>
              {formatVersion(selectedVersion)}

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
            items={sortedArticleVersions.map((version, i) => ({
              itemId: i,
              content: formatVersion(version),
              onItemSelect: () => onDropdownHandle(version),
              isSelected: version === selectedVersion
            }))}
          />
        </Dropdown>

        <span style={versionInfoStyle}>
          {selectedVersion === API.STABLE_VERSION ? (
            ``
          ) : selectedVersion === API.LEGACY_VERSION ? (
            <span>
              This version covers only some functionalities of the Configuration
              API. For the rest, refer to the Configuration API v3.1.
            </span>
          ) : (
            <span>
              This is the <strong>developer preview</strong> version of our API.
              Keep in mind it might be <strong>subject to change</strong>.
            </span>
          )}
        </span>
      </Content>
    </Container>
  );
};

export default Version;
