import React, { useState, useEffect, useLayoutEffect } from "react";
import { node, object } from "prop-types";
import { MDXProvider } from "@mdx-js/react";

import { VersionProvider, RatingProvider } from "../../contexts";
import { canUseWindow } from "../../utils";
import { useRating } from "../../hooks";
import Version, { getVersionsByGroup } from "../core/version";
import SEO from "../core/seo";
import { Search } from "../core/Search";
import Header from "../core/header";
import {
  MainWrapper,
  LeftColumn,
  MiddleColumn,
  Content,
  RatingWrapper,
  // LeftColumnRedoc,
  NavHeader,
} from "../core/components";
import Rating from "../core/Rating";
import { Headings, CodeBlocks, Scopes, Errors } from "../extensions";

import { Header as PageHeader } from "../core/Page";

const components = {
  ...CodeBlocks,
  ...Headings,
  Search,
  Scopes,
  Errors,
};

const Page = ({ frontMatter, children }) => {
  const {
    title,
    category,
    desc,
    subcategory,
    apiVersion: currentApiVersion,
    versionGroup,
    timeToRead,
  } = frontMatter;

  const versions = getVersionsByGroup(versionGroup);

  const [selectedVersion, setSelectedVersion] = useState(
    versions.STABLE_VERSION
  );

  useEffect(() => {
    const pathname = window.location.pathname;

    versions.ALL_VERSIONS.filter(
      (version) => version !== versions.STABLE_VERSION
    ).forEach((version) => {
      if (pathname.includes(version)) {
        setSelectedVersion(version);
      }
    });
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      try {
        const selector = document.querySelector(hash);
        if (selector) {
          selector.scrollIntoView();
          window.scrollBy(0, -SCROLL_OFFSET);
        }
      } catch (error) {}
    }
  }, []);

  const versionContext = {
    selected: selectedVersion,
    items: versions,
  };

  // TODO: make sure this works in build
  const slug = canUseWindow ? window.location.pathname : "";
  const ratingContext = useRating({ slug });
  const useRedocPage = ["livechat-accounts-api"].includes(subcategory);

  return (
    <RatingProvider value={ratingContext}>
      <VersionProvider value={versionContext}>
        <SEO desc={desc} title={title} />
        <Header />
        <MainWrapper>
          {!useRedocPage && (
            <LeftColumn>
              <NavHeader>
                <Search />
              </NavHeader>
            </LeftColumn>
          )}
          <MiddleColumn noMargin={useRedocPage} noPadding={useRedocPage}>
            {/* INFO: Will be fixed in DPS-2741
            
            {currentApiVersion && (
              <Version
                articleVersions={articlesVersions[category][subcategory][title]}
                redirectToVersion={redirectToVersion}
                group={versionGroup}
              />
            )} */}
            <Content className={useRedocPage ? "redoc" : ""}>
              {title && !useRedocPage && (
                <PageHeader title={title} timeToRead={timeToRead} />
              )}

              <MDXProvider components={components}>{children}</MDXProvider>

              {!useRedocPage && (
                <RatingWrapper>
                  <Rating label="Was this article helpful?" />
                </RatingWrapper>
              )}
            </Content>
          </MiddleColumn>
        </MainWrapper>
      </VersionProvider>
    </RatingProvider>
  );
};

Page.propTypes = {
  children: node.isRequired,
  meta: object,
};

export default Page;
