import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import {
  Dropdown,
  DropdownList,
  Button,
  PopperTooltip,
} from "@livechat/design-system";
import { VERSIONS_GROUPS } from "../../constant";
import { versionToString } from "../../utils";
import { WarningIcon, ArrowDownIcon } from "./icons";
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

const Warning = ({ selectedVersion, versions }) => (
  <PopperTooltip
    isVisible={true}
    placement={"bottom"}
    triggerActionType={"hover"}
    trigger={
      <span>
        <WarningIcon
          width={18}
          style={{
            margin: "0 10px 2px 0",
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

  // Extra case for stable version to match the sidebar colors
  const isStable = selectedVersion === versions.STABLE_VERSION;

  const { isActive } = useContext(PromotionContext);

  return (
    <Container promoIsActive={isActive} leftPadding={leftPadding}>
      <Content>
        {!isStable && (
          <Warning selectedVersion={selectedVersion} versions={versions} />
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
                <ArrowDownIcon />
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
