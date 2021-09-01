import React, { useState, useEffect } from "react";
import { node, object } from "prop-types";
import { MDXProvider } from "@mdx-js/react";
import { useRouter } from "next/router";
import Link from "next/link";
import FullStory from "react-fullstory";
import {
  VersionProvider,
  RatingProvider,
  PromotionProvider,
} from "../../contexts";
import { canUseWindow } from "../../utils";
import { useRating } from "../../hooks";
import { SCROLL_OFFSET } from "../../constant";
import Version, { getVersionsByGroup } from "../core/version";
import { HomeIcon, ChevronRight } from "../core/icons";
import SEO from "../core/seo";
import Header from "../core/header";
import articlesVersions from "../../configs/articlesVersions.json";
import {
  MainWrapper,
  LeftColumn,
  MiddleColumn,
  Content,
  RatingWrapper,
  LeftColumnRedoc,
  NavHeader,
} from "../core/components";
import { Search } from "../core/Search";
import SideNav from "../core/SideNav";
import { useLocalStorage } from "../../hooks";
import Rating from "../core/Rating";
import {
  Headings,
  CodeBlocks,
  Scopes,
  Errors,
  Placeholder,
} from "../extensions";

import { Header as PageHeader } from "../core/Page";

const components = {
  ...CodeBlocks,
  ...Headings,
  Scopes,
  Errors,
  Placeholder,
};

const Page = ({ frontMatter, children }) => {
  const {
    title,
    category,
    desc,
    subcategory,
    apiVersion: currentApiVersion,
    versionGroup,
    slug: customSlug,
  } = frontMatter;
  const router = useRouter();

  const [expanded, setExpanded] = useLocalStorage("navMenuExpanded", true);

  const versions = getVersionsByGroup(versionGroup);

  const [selectedVersion, setSelectedVersion] = useState(
    versions.STABLE_VERSION
  );

  const promotionContext = { isActive: false, content: <div /> };

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

  useEffect(() => {
    const hash = window.location.hash;
    const timeout = setTimeout(() => {
      if (hash) {
        try {
          const selector = document.querySelector(hash);

          if (selector) {
            selector.scrollIntoView();
            window.scrollBy(
              0,
              -(SCROLL_OFFSET + (promotionContext.isActive ? 40 : 0))
            );
          }
        } catch (error) {}
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [promotionContext.isActive]);

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

      router.push(currentSlug.replace("/docs", ""));
    }
  };

  const versionContext = {
    selected: selectedVersion,
    items: versions,
  };

  let slug = canUseWindow ? window.location.pathname : "";

  // FIXME: there is a netlify limitation with removing trailing slash https://github.com/netlify/netlify-plugin-nextjs/issues/256
  // For now we are adding manually slash in order to work with hooks and components.
  // This is due to migration to next and netlify.
  slug = slug[slug.length - 1] === "/" ? slug : `${slug}/`;

  const ratingContext = useRating({ slug });
  const useRedocPage = [
    "global-accounts-api",
    "customer-accounts-api",
  ].includes(subcategory);

  const ORG_ID = process.env.NEXT_PUBLIC_FULLSTORY_ORG;

  return (
    <RatingProvider value={ratingContext}>
      <VersionProvider value={versionContext}>
        <PromotionProvider value={promotionContext}>
          {ORG_ID && <FullStory org={ORG_ID} />}

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
                  articleVersions={
                    articlesVersions[category][subcategory][title]
                  }
                  redirectToVersion={redirectToVersion}
                  group={versionGroup}
                />
              )}
              <Content className={useRedocPage ? "redoc" : ""}>
                {title && !useRedocPage && <PageHeader title={title} />}
                {useRedocPage && (
                  <LeftColumnRedoc>
                    <NavHeader>
                      <Link href={"/"} style={{ color: "inherit" }}>
                        <span>
                          <HomeIcon width={18} style={{ display: "block" }} />
                        </span>
                      </Link>
                      <ChevronRight width={14} />
                      <span
                        style={{
                          marginBottom: "-3px",
                          textTransform: "capitalize",
                        }}
                      >
                        {category}
                      </span>
                    </NavHeader>
                    <NavHeader>
                      <Search />
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
        </PromotionProvider>
      </VersionProvider>
    </RatingProvider>
  );
};

Page.propTypes = {
  children: node.isRequired,
  meta: object,
};

export default Page;
