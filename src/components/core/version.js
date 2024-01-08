import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import {
  Dropdown,
  DropdownList,
  Button,
  PopperTooltip,
} from "@livechat/design-system";

import ChevronDown from "react-material-icon-svg/dist/ChevronDown";
import { WarningIcon } from "./icons";

import useMediaQuery from "hooks/useMediaQuery";

import { VERSIONS_GROUPS } from "../../constants";
import { versionToString, getVersionColor } from "../../utils";
import { VersionContext, PromotionContext } from "../../contexts";

export const getVersionsByGroup = (group) =>
  group && VERSIONS_GROUPS[group]
    ? VERSIONS_GROUPS[group]
    : VERSIONS_GROUPS.DEFAULT;

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 40;
  transition: left 0.3s ease-out;

  @media (min-width: 768px) {
    left: 260px;
    width: calc(100% - 260px);
    top: ${(props) => (props.promoIsActive ? "100px" : "60px")};
  }
`;

const Content = styled.div`
  padding: 20px 24px 32px 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  @media (max-width: 1270px) {
    background-color: #fff;
    padding-bottom: 24px;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding-left: 30px;
  }
`;

const ButtonBody = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

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

const StyledButton = styled(Button)`
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  padding: 7px 8px 7px 16px;
`;

const Warning = ({ selectedVersion, versionColor, versions }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <PopperTooltip
      isVisible={true}
      placement={isMobile ? "bottom-start" : "bottom"}
      triggerActionType={isMobile ? "click" : "hover"}
      trigger={
        <span>
          <WarningIcon
            style={{
              color: `${versionColor}`,
              verticalAlign: "middle",
            }}
          />
        </span>
      }
      closeOnOutsideClick
      zIndex={99999}
    >
      <div style={{ maxWidth: "320px" }}>
        {selectedVersion === versions.DEV_PREVIEW_VERSION && (
          <p>
            This is the <strong>developer preview</strong> version of our API.
            Keep in mind it might be <strong>subject to change</strong>.
          </p>
        )}
        {versions.LEGACY_VERSIONS.includes(selectedVersion) && (
          <p>This is the legacy version of the API.</p>
        )}
        {versions.DEPRECATED_VERSIONS.includes(selectedVersion) && (
          <p>
            This version deprecated.
            <br /> We recommend you migrate to the current stable version.
          </p>
        )}

        <p style={{ marginBottom: "10px" }}>
          If you have any questions, please let us know at{" "}
          <a
            href="mailto:developers@text.com"
            style={{ color: "white", textDecoration: "underline" }}
          >
            developers@text.com
          </a>
          .
        </p>
      </div>
    </PopperTooltip>
  );
};

const Version = ({ articleVersions, redirectToVersion, leftPadding }) => {
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
    const getVersion = () => {
      if (version === versions.STABLE_VERSION) {
        return "(stable)";
      }

      if (versions.LEGACY_VERSIONS.includes(version)) {
        return "(legacy)";
      }

      if (version === versions.DEV_PREVIEW_VERSION) {
        return "(dev preview)";
      }

      if (versions.DEPRECATED_VERSIONS.includes(version)) {
        return "(deprecated)";
      }
    };

    return (
      <span>
        {version} {getVersion()}
      </span>
    );
  };

  const sortedArticleVersions = articleVersions
    .map((e) => parseFloat(e))
    .sort((a, b) => b - a)
    .map((e) => versionToString(e));

  const versionColor = getVersionColor(selectedVersion, versions);
  const isStable = selectedVersion === versions.STABLE_VERSION;

  const { isActive } = useContext(PromotionContext);

  return (
    <Container promoIsActive={isActive} leftPadding={leftPadding}>
      <Content>
        {!isStable && (
          <Warning
            selectedVersion={selectedVersion}
            versionColor={versionColor}
            versions={versions}
          />
        )}
        <Dropdown
          isVisible={showDropdown}
          onClose={closeDropdown}
          placement={"bottom-end"}
          triggerRenderer={({ ref }) => (
            <StyledButton kind="secondary" onClick={openDropdown} ref={ref}>
              <ButtonBody>
                <span>API version:</span>
                {formatVersion(selectedVersion)}
                <ChevronDown fill="#424D57" width="20px" height="20px" />
              </ButtonBody>
            </StyledButton>
          )}
        >
          <StyledDropdownList
            items={sortedArticleVersions.map((version, i) => ({
              itemId: i,
              content: formatVersion(version),
              onItemSelect: () => onDropdownHandle(version),
              isSelected: version === selectedVersion,
            }))}
          />
        </Dropdown>
      </Content>
    </Container>
  );
};

export default Version;
