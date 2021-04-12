import React, { useState, useEffect, useLayoutEffect } from "react";
import { node, object } from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import { useRouter } from "next/router";
import Link from "next/link";

import { VersionProvider, RatingProvider } from "../../contexts";
import { canUseWindow } from "../../utils";
import { useRating } from "../../hooks";
import Version, { getVersionsByGroup } from "../core/version";
import { HomeIcon, ChevronRight } from "../core/icons";
import SEO from "../core/seo";
import Header from "../core/header";
import {
  MainWrapper,
  LeftColumn,
  MiddleColumn,
  Content,
  RatingWrapper,
  LeftColumnRedoc,
  NavHeader,
} from "../core/components";
import SideNav from "../core/SideNav";
import { useLocalStorage } from "../../hooks";
import Rating from "../core/Rating";
import {
  Headings,
  CodeBlocks,
  Scopes,
  Errors,
  Placeholder,
  Redoc,
} from "../extensions";
import categories from "../../configs/categories";

import { Header as PageHeader } from "../core/Page";

const components = {
  ...CodeBlocks,
  ...Headings,
  Scopes,
  Errors,
  Placeholder,
  Redoc,
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
    slug: customSlug,
  } = frontMatter;
  const router = useRouter();

  const [expanded, setExpanded] = useLocalStorage("navMenuExpanded", true);

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

  const redirectToVersion = (version) => {
    setSelectedVersion(version);

    const pathname = window.location.pathname;
    let currentSlug = customSlug || pathname;

    if (selectedVersion !== version) {
      if (selectedVersion === versions.STABLE_VERSION) {
        currentSlug = currentSlug.replace(
          subcategory,
          `${subcategory}/v${version}`
        );
      } else {
        if (version === versions.STABLE_VERSION) {
          currentSlug = currentSlug.replace(
            `${subcategory}/v${selectedVersion}`,
            subcategory
          );
        } else {
          currentSlug = currentSlug.replace(
            `${subcategory}/v${selectedVersion}`,
            `${subcategory}/v${version}`
          );
        }
      }

      router.push(currentSlug);
    }
  };

  const versionContext = {
    selected: selectedVersion,
    items: versions,
  };

  // TODO: make sure this works in build
  const slug = canUseWindow ? window.location.pathname : "";
  const ratingContext = useRating({ slug });
  const useRedocPage = ["livechat-accounts-api"].includes(subcategory);
  const categoryMeta = categories.find((item) => item.slug === category);

  return (
    <RatingProvider value={ratingContext}>
      <VersionProvider value={versionContext}>
        <SEO desc={desc} title={title} />
        <Header />
        <MainWrapper>
          {!useRedocPage && (
            <LeftColumn>
              <SideNav
                currentSlug={slug}
                category={category}
                subcategory={subcategory}
                expanded={expanded}
                setExpanded={setExpanded}
                versions={versions}
              />
            </LeftColumn>
          )}
          <MiddleColumn noMargin={useRedocPage} noPadding={useRedocPage}>
            {currentApiVersion && (
              <Version
                articleVersions={versions.ALL_VERSIONS}
                redirectToVersion={redirectToVersion}
                group={versionGroup}
              />
            )}
            <Content className={useRedocPage ? "redoc" : ""}>
              {title && !useRedocPage && (
                <PageHeader title={title} timeToRead={timeToRead} />
              )}

              {useRedocPage && (
                <LeftColumnRedoc>
                  <NavHeader>
                    <Link href={"/"} style={{ color: "inherit" }}>
                      <span>
                        <HomeIcon width={18} style={{ display: "block" }} />
                      </span>
                    </Link>
                    <ChevronRight width={14} />
                    <span style={{ marginBottom: "-3px" }}>
                      {categoryMeta.title || "Home"}
                    </span>
                  </NavHeader>
                </LeftColumnRedoc>
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
