import React, { useState, useEffect, useLayoutEffect } from "react";
import { graphql, Link, navigate } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import SmoothScroll from "smooth-scroll";

import "@livechat/design-system/dist/design-system.css";
import "normalize.css";
import "../components/core/fonts.css";
import "../components/core/layout.css";
import "../components/core/prism.css";
import "../components/core/algolia.css";

import SideNav from "../components/core/SideNav";
import Header from "../components/core/header";
import Version from "../components/core/version";

import {
  MainWrapper,
  LeftColumn,
  MiddleColumn,
  Content,
  PageHeader
} from "../components/core/components";

import * as DesignSystem from "@livechat/design-system";
import { Headings, CodeBlocks } from "../components/extensions";
import SEO from "../components/core/seo";
import RichMessagePreview from "../vendors/rich-message-preview.min.js";
import useLocalStorage from "../hooks/useLocalStorage";

import { API } from "../constant";

const components = {
  ...DesignSystem,
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
      apiVersion: currentApiVersion
    },
    fields: { slug },
    parent: { modifiedTime }
  } = mdx;

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

  const [selectedVersion, setSelectedVersion] = useState(API.STABLE_VERSION);

  const [expanded, setExpanded] = useLocalStorage("navMenuExpanded", true);

  useEffect(() => {
    const pathname = window.location.pathname;
    API.ALL_VERSIONS.filter(version => version !== API.STABLE_VERSION).forEach(
      version => {
        if (pathname.includes(version)) {
          setSelectedVersion(version);
        }
      }
    );
  }, []);

  useLayoutEffect(() => {
    if (window.location.hash) {
      const anchor = document.querySelector(window.location.hash);
      const scroll = new SmoothScroll();

      scroll.animateScroll(anchor, null, {
        offset: 210,
        speedAsDuration: true,
        speed: 200
      });
    }
  }, []);

  const redirectToVersion = version => {
    setSelectedVersion(version);

    let currentSlug = customSlug || slug;

    if (selectedVersion !== version) {
      if (selectedVersion === API.STABLE_VERSION) {
        currentSlug = currentSlug.replace(
          subcategory,
          `${subcategory}/v${version}`
        );
      } else {
        if (version === API.STABLE_VERSION) {
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

  return (
    <>
      <SEO desc={desc} title={title} />
      <Header selectedVersion={selectedVersion} />
      <MainWrapper>
        <LeftColumn>
          <SideNav
            currentSlug={customSlug || slug}
            category={category}
            subcategory={subcategory}
            currentApiVersion={selectedVersion}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        </LeftColumn>
        <MiddleColumn>
          {currentApiVersion && (
            <Version
              articleVersions={articlesVersions[category][subcategory][title]}
              selectedVersion={selectedVersion}
              redirectToVersion={redirectToVersion}
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
          </Content>
        </MiddleColumn>
      </MainWrapper>
    </>
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
