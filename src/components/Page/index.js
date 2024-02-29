import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { node, object } from "prop-types";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import FullStory from "react-fullstory";
import { SideNav } from "../core/SideNav";
import Version, { getVersionsByGroup } from "../core/version";
import { HomeIcon, ChevronRight } from "../core/icons";
import SEO from "../core/seo";
import Header from "../core/Navbar/Header";
import { Header as PageHeader } from "../core/Page";
import {
  MainWrapper,
  MiddleColumn,
  Content,
  LeftColumnRedoc,
  LeftColumnRedocWrapper,
  NavHeader,
  CategoryRedoc
} from "../core/components";
import Rating from "../core/Rating";
import Footer from "../core/Footer/Footer";
import {
  Headings,
  CodeBlocks,
  Scopes,
  Errors,
  Placeholder,
  Image,
  ChatWindow
} from "../extensions";

import { RATING_POSITION } from "../../constants";
import {
  VersionProvider,
  RatingProvider,
  PromotionProvider
} from "../../contexts";
import { AuthProvider } from "../../contexts/auth";
import { canUseWindow } from "../../utils";
import { useRating } from "../../hooks";
import articlesVersions from "../../configs/articlesVersions.json";
import { MDXRemote } from "next-mdx-remote";

const ContentSideNav = dynamic(
  () => import("../core/SideNav").then(mod => mod.ContentSideNav),
  { ssr: false, loading: () => <p>...</p> }
);

const components = {
  ...CodeBlocks,
  ...Headings,
  Scopes,
  Errors,
  Placeholder,
  Image,
  ChatWindow
};

const StyledRating = styled(Rating)`
  margin-top: 50px;

  > label {
    margin: 0 0 5px 0;
  }
  label + div {
    justify-content: center;
  }
`;

const Page = ({ data, children }) => {
  const router = useRouter();

  if (!data) {
    return children;
  }

  const {
    title,
    subtitle,
    category,
    desc,
    subcategory,
    robots,
    apiVersion: currentApiVersion,
    versionGroup,
    slug: customSlug
  } = data.data;

  const versions = getVersionsByGroup(versionGroup);

  const [selectedVersion, setSelectedVersion] = useState(
    versions.STABLE_VERSION
  );

  const promotionContext = {
    isActive: false,
    content: (
      <div>
        Available now 👉{" "}
        <a
          href="https://developers.livechat.com/building-apps-crash-course/"
          rel="noopener nofollow"
          target="_blank"
        >
          Free building apps crash course
        </a>{" "}
        with the LiveChat Developer Program.
      </div>
    )
  };

  useEffect(() => {
    const pathname = window.location.pathname;

    versions.ALL_VERSIONS.filter(
      version => version !== versions.STABLE_VERSION
    ).forEach(version => {
      if (pathname.includes(version)) {
        setSelectedVersion(version);
      }
    });
    // eslint-disable-next-line
  }, []);

  const redirectToVersion = version => {
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
    items: versions
  };

  let slug = canUseWindow ? window.location.pathname : "";

  // FIXME: there is a netlify limitation with removing trailing slash https://github.com/netlify/netlify-plugin-nextjs/issues/256
  // For now we are adding manually slash in order to work with hooks and components.
  // This is due to migration to next and netlify.
  slug = slug[slug.length - 1] === "/" ? slug : `${slug}/`;

  const ratingContext = useRating({ slug });
  const useRedocPage =
    [
      "global-accounts-api",
      "customer-accounts-api",
      "text-api",
      "chat-api"
    ].includes(subcategory) || ["Chat API"].includes(title);

  const useAsyncApi = ["Chat API AsyncAPI"].includes(title);
  const ORG_ID = process.env.NEXT_PUBLIC_FULLSTORY_ORG;

  return (
    <AuthProvider>
      <RatingProvider value={ratingContext}>
        <VersionProvider value={versionContext}>
          <PromotionProvider value={promotionContext}>
            {ORG_ID && <FullStory org={ORG_ID} />}

            <SEO
              desc={desc}
              title={title}
              subtitle={subtitle}
              robots={robots}
            />
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
                  {title && !useRedocPage && !useAsyncApi && (
                    <PageHeader title={title} />
                  )}
                  {useRedocPage && (
                    <LeftColumnRedocWrapper>
                      <LeftColumnRedoc>
                        <NavHeader>
                          <Link href={"/"} style={{ color: "inherit" }}>
                            <span>
                              <HomeIcon
                                width={18}
                                style={{ display: "block" }}
                              />
                            </span>
                          </Link>
                          <ChevronRight width={14} />
                          <CategoryRedoc>{category}</CategoryRedoc>
                        </NavHeader>
                      </LeftColumnRedoc>
                    </LeftColumnRedocWrapper>
                  )}
                  {useRedocPage || useAsyncApi ? (
                    children
                  ) : (
                    <MDXRemote {...data?.content} components={components} />
                  )}

                  {(!useRedocPage || !useAsyncApi) && (
                    <StyledRating position={RATING_POSITION.BOTTOM} />
                  )}
                </Content>
              </MiddleColumn>

              {!useRedocPage && <ContentSideNav version={currentApiVersion} />}
            </MainWrapper>
            <Footer />
          </PromotionProvider>
        </VersionProvider>
      </RatingProvider>
    </AuthProvider>
  );
};

Page.propTypes = {
  children: node.isRequired,
  meta: object
};

export default Page;
