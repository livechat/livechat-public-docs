import React, { useState, useEffect } from "react";
import { node, object } from "prop-types";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import FullStory from "react-fullstory";
import {
  VersionProvider,
  RatingProvider,
  PromotionProvider,
} from "../../contexts";
import { canUseWindow } from "../../utils";
import { useRating } from "../../hooks";
import Version, { getVersionsByGroup } from "../core/version";
import { HomeIcon, ChevronRight } from "../core/icons";
import SEO from "../core/seo";
import Header from "../core/header";
import articlesVersions from "../../configs/articlesVersions.json";
import {
  MainWrapper,
  MiddleColumn,
  Content,
  RatingWrapper,
  LeftColumnRedoc,
  LeftColumnRedocWrapper,
  NavHeader,
  CategoryRedoc,
} from "../core/components";
import { Search } from "../core/Search";

const SideNav = dynamic(
  () => import("../core/SideNav").then((mod) => mod.SideNav),
  { ssr: false, loading: () => <p>...</p> }
);
const ContentSideNav = dynamic(
  () => import("../core/SideNav").then((mod) => mod.ContentSideNav),
  { ssr: false, loading: () => <p>...</p> }
);
import Rating from "../core/Rating";

import { Header as PageHeader } from "../core/Page";

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

  const versions = getVersionsByGroup(versionGroup);

  const [selectedVersion, setSelectedVersion] = useState(
    versions.STABLE_VERSION
  );

  const promotionContext = {
    isActive: false,
    content: (
      <div>
        Master LiveChat Design System at the{" "}
        <a
          href="https://developers.livechat.com/live-coding-livechat-design-system-in-use/"
          rel="noopener nofollow"
          target="_blank"
        >
          live coding session
        </a>{" "}
        on Sept 16, 5 pm CEST.
      </div>
    ),
  };

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

      router.push("/" + currentSlug.replace("/docs", ""));
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
              <SideNav
                category={category}
                version={currentApiVersion}
                title={title}
              />
            )}

            <MiddleColumn
              noMargin={useRedocPage}
              noPadding={useRedocPage}
              fullWidth={useRedocPage}
            >
              {currentApiVersion && (
                <Version
                  leftPadding={useRedocPage}
                  articleVersions={
                    articlesVersions[category][subcategory][title]
                  }
                  redirectToVersion={redirectToVersion}
                  group={versionGroup}
                />
              )}
              <Content
                className={
                  useRedocPage
                    ? `redoc ${currentApiVersion ? "redoc-with-version" : ""}`
                    : ""
                }
                noPadding={useRedocPage}
              >
                {title && !useRedocPage && <PageHeader title={title} />}
                {useRedocPage && (
                  <LeftColumnRedocWrapper>
                    <LeftColumnRedoc>
                      <NavHeader>
                        <Link href={"/"} style={{ color: "inherit" }}>
                          <span>
                            <HomeIcon width={18} style={{ display: "block" }} />
                          </span>
                        </Link>
                        <ChevronRight width={14} />
                        <CategoryRedoc>{category}</CategoryRedoc>
                      </NavHeader>
                      <NavHeader>
                        <Search />
                      </NavHeader>
                    </LeftColumnRedoc>
                  </LeftColumnRedocWrapper>
                )}

                {children}

                {!useRedocPage && (
                  <RatingWrapper>
                    <Rating label="Was this article helpful?" />
                  </RatingWrapper>
                )}
              </Content>
            </MiddleColumn>

            {!useRedocPage && (
              <ContentSideNav version={currentApiVersion} slug={customSlug} />
            )}
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
