import React, { useState, useEffect, useLayoutEffect } from "react";
import { graphql, Link, navigate } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import "@livechat/design-system/dist/design-system.css";
import "normalize.css";
import "../components/core/fonts.css";
import "../components/core/layout.css";
import "../components/core/prism.css";
import "../components/core/algolia.css";

import SideNav from "../components/core/SideNav";
import Header from "../components/core/header";
import Version, { getVersionsByGroup } from "../components/core/version";

import {
  MainWrapper,
  LeftColumn,
  MiddleColumn,
  Content,
  RatingWrapper
} from "../components/core/components";

import { Header as PageHeader } from "../components/core/Page";
import Rating from "../components/core/Rating";

import { Headings, CodeBlocks } from "../components/extensions";
import SEO from "../components/core/seo";
import RichMessagePreview from "../vendors/rich-message-preview.min.js";

import { useLocalStorage, useRating } from "../hooks";
import { VersionProvider, RatingProvider } from "../contexts";
import { SCROLL_OFFSET } from "../constant";

const components = {
  ...CodeBlocks,
  ...Headings,
  RichMessagePreview,
  Link
};

export default ({ data: { mdx, allMdx } }) => {
  const {
    body,
    timeToRead,
    frontmatter: {
      title,
      category,
      desc,
      subcategory,
      slug: customSlug,
      apiVersion: currentApiVersion,
      versionGroup
    },
    fields: { slug },
    parent: { modifiedTime }
  } = mdx;

  const versions = getVersionsByGroup(versionGroup);
  const { edges } = allMdx;

  const articlesVersions = edges
    .map(edge => {
      const {
        node: {
          frontmatter: { title, category, subcategory, apiVersion }
        }
      } = edge;

      return {
        title,
        category,
        subcategory,
        apiVersion
      };
    })
    .reduce((prev, curr) => {
      const { title, apiVersion, subcategory, category } = curr;

      // NOTE: should improve using optional chaining
      if (!prev[category]) {
        prev[category] = {};
      }
      if (!prev[category][subcategory]) {
        prev[category][subcategory] = {};
      }
      if (!prev[category][subcategory][title]) {
        prev[category][subcategory][title] = [apiVersion];
      } else {
        prev[category][subcategory][title].push(apiVersion);
      }

      return prev;
    }, {});

  const [selectedVersion, setSelectedVersion] = useState(
    versions.STABLE_VERSION
  );

  const [expanded, setExpanded] = useLocalStorage("navMenuExpanded", true);

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

  useLayoutEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const selector = document.querySelector(hash);
      if (selector) {
        selector.scrollIntoView();
        window.scrollBy(0, -SCROLL_OFFSET);
      }
    }
  }, []);

  const redirectToVersion = version => {
    setSelectedVersion(version);

    let currentSlug = customSlug || slug;

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
      navigate(currentSlug);
    }
  };

  const versionContext = {
    selected: selectedVersion,
    items: versions
  };

  const ratingContext = useRating({ slug });

  return (
    <RatingProvider value={ratingContext}>
      <VersionProvider value={versionContext}>
        <SEO desc={desc} title={title} />
        <Header />
        <MainWrapper>
          <LeftColumn>
            <SideNav
              currentSlug={customSlug || slug}
              category={category}
              subcategory={subcategory}
              expanded={expanded}
              setExpanded={setExpanded}
              versions={versions}
            />
          </LeftColumn>
          <MiddleColumn>
            {currentApiVersion && (
              <Version
                articleVersions={articlesVersions[category][subcategory][title]}
                redirectToVersion={redirectToVersion}
                group={versionGroup}
              />
            )}
            <Content>
              {title && (
                <PageHeader
                  title={title}
                  timeToRead={timeToRead}
                  modifiedTime={modifiedTime}
                />
              )}
              <MDXProvider components={components}>
                <MDXRenderer>{body}</MDXRenderer>
              </MDXProvider>

              <RatingWrapper>
                <Rating label="Was this article helpful?" />
              </RatingWrapper>
            </Content>
          </MiddleColumn>
        </MainWrapper>
      </VersionProvider>
    </RatingProvider>
  );
};

export const pageQuery = graphql`
  query ArticleQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents(maxDepth: 3)
      timeToRead
      parent {
        ... on File {
          modifiedTime(formatString: "MM/DD/YYYY")
        }
      }
      frontmatter {
        title
        desc
        category
        subcategory
        slug
        apiVersion
        versionGroup
      }
      fields {
        slug
      }
    }

    allMdx(filter: { frontmatter: { apiVersion: { ne: null } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            apiVersion
            subcategory
            category
          }
        }
      }
    }
  }
`;
