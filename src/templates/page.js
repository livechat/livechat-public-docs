import React, { useState, useEffect } from "react";
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
import RichMessagePreview  from "../vendors/rich-message-preview.min.js";

import constants from "../constant";

const components = {
  ...DesignSystem,
  ...CodeBlocks,
  ...Headings,
  RichMessagePreview,
  Link
};

export default ({ data: { mdx } }) => {
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

  const [selectedVersion, setSelectedVersion] = useState(
    constants.api.stableVersion
  );

  useEffect(() => {
    const pathname = window.location.pathname;
    constants.api.unstableVersions.some(e => {
      if (pathname.includes(e)) {
        setSelectedVersion(e);
      }
    });
  }, []);

  const redirectToVersion = version => {
    setSelectedVersion(version);

    const pathname = window.location.pathname;

    if (!(selectedVersion === version)) {
      if (selectedVersion === constants.api.stableVersion) {
        navigate(pathname.replace(subcategory, `${subcategory}/v${version}`));
      } else {
        if (version === constants.api.stableVersion) {
          navigate(
            pathname.replace(`${subcategory}/v${selectedVersion}`, subcategory)
          );
        } else {
          navigate(
            pathname.replace(
              `${subcategory}/v${selectedVersion}`,
              `${subcategory}/v${version}`
            )
          );
        }
      }
    }
  };

  return (
    <>
      <SEO desc={desc} title={title} />
      <Header />
      <MainWrapper>
        <LeftColumn>
          <SideNav
            currentSlug={customSlug || slug}
            category={category}
            subcategory={subcategory}
            currentApiVersion={selectedVersion}
            selectedVersion={selectedVersion}
          />
        </LeftColumn>
        <MiddleColumn>
          {currentApiVersion && (
            <Version
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
  }
`;
