import React, { useEffect, useState } from "react";
import { string } from "prop-types";
import Link from "next/link";
import FullStory from "react-fullstory";
import { PromotionProvider, VersionProvider } from "../../contexts";
import { canUseWindow } from "../../utils";
import { SCROLL_OFFSET } from "../../constant";
import { getVersionsByGroup } from "../core/version";
import { HomeIcon, ChevronRight } from "../core/icons";
import SEO from "../core/seo";
import Header from "../core/header";
import {
  MainWrapper,
  MiddleColumn,
  Content,
  LeftColumnRedoc,
  NavHeader,
} from "../core/components";

import { Search } from "../core/Search";
import Redoc from "../extensions/Redoc";

const Page = ({ name, content, category, desc, title }) => {
  const versions = getVersionsByGroup();

  const [selectedVersion, setSelectedVersion] = useState(
    versions.STABLE_VERSION
  );

  const promotionContext = { isActive: false, content: <div /> };
  const versionContext = {
    selected: selectedVersion,
    items: versions,
  };

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

  let slug = canUseWindow ? window.location.pathname : "";

  // FIXME: there is a netlify limitation with removing trailing slash https://github.com/netlify/netlify-plugin-nextjs/issues/256
  // For now we are adding manually slash in order to work with hooks and components.
  // This is due to migration to next and netlify.
  slug = slug[slug.length - 1] === "/" ? slug : `${slug}/`;

  const ORG_ID = process.env.NEXT_PUBLIC_FULLSTORY_ORG;

  return (
    <VersionProvider value={versionContext}>
      <PromotionProvider value={promotionContext}>
        {ORG_ID && <FullStory org={ORG_ID} />}

        <SEO desc={desc} title={title} />
        <Header />
        <MainWrapper>
          <MiddleColumn noMargin noPadding>
            <Content className="redoc">
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

              <Redoc content={content} name={name} />
            </Content>
          </MiddleColumn>
        </MainWrapper>
      </PromotionProvider>
    </VersionProvider>
  );
};

Page.propTypes = {
  name: string,
  content: string,
  category: string,
};

export default Page;
