import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import {
  Dropdown,
  DropdownList,
  Button,
  PopperTooltip,
} from "@livechat/design-system";
import { VERSIONS_GROUPS } from "../../constant";
import { versionToString, getVersionColor } from "../../utils";
import { WarningIcon } from "./icons";
import { VersionContext } from "../../contexts";
import { logAmplitudeEvent } from "../../utils/index";

export const getVersionsByGroup = (group) =>
  group && VERSIONS_GROUPS[group]
    ? VERSIONS_GROUPS[group]
    : VERSIONS_GROUPS.DEFAULT;

const Container = styled.div`
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(255, 255, 255);
  position: sticky;
  top: 0px;
  right: 0;
  left: 0;
  z-index: 40;
  transition: left 0.3s ease-out;

  .label {
    margin-right: 10px;
  }

  margin-left: -50px;
  margin-right: -20px;

  @media (min-width: 768px) {
    top: 60px;
  }

  @media (min-width: 1024px) {
    margin-right: -30px;
  }
`;

const Content = styled.div`
  padding: 9px 10px 7px 50px;
  background-color: ${({ bgColor }) => `${bgColor}`};
  border-bottom: ${({ borderColor }) => `solid 1px ${borderColor}`};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DesktopNote = styled.div`
  @media (max-width: 720px) {
    display: none;
  }
`;

const ButtonBody = styled.div`
  display: flex;
  align-items: center;
`;

const labelStyle = {
  marginRight: "10px",
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

const Warning = ({ selectedVersion, versionColor, versions }) => (
  <PopperTooltip
    isVisible={true}
    placement={"bottom"}
    triggerActionType={"hover"}
    trigger={
      <span>
        <WarningIcon
          width={18}
          style={{
            color: `rgba(${versionColor}, 1)`,
            margin: "0 7px 2px",
            verticalAlign: "middle",
          }}
        />
      </span>
    }
    closeOnOutsideClick
    zIndex={99999}
  >
    <div style={{ maxWidth: "320px" }}>
      {versions.LEGACY_VERSIONS.includes(selectedVersion) && (
        <p>This is the legacy version of the API.</p>
      )}
      {selectedVersion === versions.DEV_PREVIEW_VERSION && (
        <p>
          This is the <strong>developer preview</strong> version of our API.
          Keep in mind it might be <strong>subject to change</strong>.
        </p>
      )}
      <p style={{ marginBottom: "10px" }}>
        If you have any questions, please let us know at{" "}
        <a
          href="mailto:developers@livechat.com"
          style={{ color: "white", textDecoration: "underline" }}
        >
          developers@livechat.com
        </a>
        .
      </p>
    </div>
  </PopperTooltip>
);

const Version = ({ articleVersions, redirectToVersion }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { items: versions, selected: selectedVersion } = useContext(
    VersionContext
  );

  const onDropdownHandle = (version) => {
    redirectToVersion(version);
    setShowDropdown(false);
  };

  const openDropdown = () => setShowDropdown(true);
  const closeDropdown = () => setShowDropdown(false);

  const formatVersion = (version) => {
    return (
      <>
        <span>{version}</span>
        <span style={{ marginLeft: "3px" }}>
          {version === versions.STABLE_VERSION
            ? `(stable)`
            : versions.LEGACY_VERSIONS.includes(version)
            ? `(legacy)`
            : `(dev preview)`}
        </span>
      </>
    );
  };

  const sortedArticleVersions = articleVersions
    .map((e) => parseFloat(e))
    .sort((a, b) => b - a)
    .map((e) => versionToString(e));

  const versionColor = getVersionColor(selectedVersion, versions);

  // Extra case for stable version to match the sidebar colors
  const isStable = selectedVersion === versions.STABLE_VERSION;

  return (
    <Container>
      <Content
        bgColor={
          isStable ? "rgb(241, 246, 248)" : `rgba(${versionColor}, 0.07)`
        }
        borderColor={
          isStable ? "rgb(232, 232, 232)" : `rgba(${versionColor}, 0.07)`
        }
      >
        <DesktopNote>
          {versions.LEGACY_VERSIONS.includes(selectedVersion) && (
            <span>You are browsing the legacy version of the API.</span>
          )}
          {selectedVersion === versions.DEV_PREVIEW_VERSION && (
            <span>
              You are browsing the developer preview version of the API.
            </span>
          )}
        </DesktopNote>

        <div>
          {!isStable && (
            <Warning
              selectedVersion={selectedVersion}
              versionColor={versionColor}
              versions={versions}
            />
          )}
          <span style={labelStyle}>API version</span>
          <Dropdown
            isVisible={showDropdown}
            onClose={closeDropdown}
            placement={"bottom-end"}
            triggerRenderer={({ ref }) => (
              <Button kind="secondary" onClick={openDropdown} ref={ref}>
                <ButtonBody>
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
                </ButtonBody>
              </Button>
            )}
          >
            <StyledDropdownList
              items={sortedArticleVersions.map((version, i) => ({
                itemId: i,
                content: formatVersion(version),
                onItemSelect: () => {
                  logAmplitudeEvent("Version selected", {
                    version: selectedVersion,
                  });
                  return onDropdownHandle(version);
                },
                isSelected: version === selectedVersion,
              }))}
            />
          </Dropdown>
        </div>
      </Content>
    </Container>
  );
};

export default Version;
