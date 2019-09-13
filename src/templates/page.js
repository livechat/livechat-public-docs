import React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

import "@livechat/design-system/dist/design-system.css";
import "normalize.css";
import "../components/core/fonts.css";
import "../components/core/layout.css";
import "../components/core/prism.css";

import SideNav from "../components/core/SideNav";
import Header from "../components/core/header";

import {
  MainWrapper,
  LeftColumn,
  MiddleColumn,
  Content,
  PageHeader
} from "../components/core/components";

import * as DesignSystem from "@livechat/design-system";
import { Headings, CodeBlocks } from "../components/extensions";

const components = {
  ...DesignSystem,
  ...CodeBlocks,
  ...Headings,
  Link
};

export default ({ data: { mdx } }) => {
  const {
    body,
    timeToRead,
    frontmatter: { title, category, subcategory, slug: customSlug },
    fields: { slug },
    parent: { modifiedTime }
  } = mdx;

  return (
    <>
      <Header />
      <MainWrapper>
        <LeftColumn>
          <SideNav
            currentSlug={customSlug || slug}
            currentTitle={title}
            category={category}
            subcategory={subcategory}
          />
        </LeftColumn>
        <MiddleColumn>
          <Content>
            <PageHeader
              title={title}
              timeToRead={timeToRead}
              modifiedTime={modifiedTime}
            />

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
        category
        subcategory
        slug
      }
      fields {
        slug
      }
    }
  }
`;
