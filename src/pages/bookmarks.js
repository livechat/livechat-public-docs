import React, { useState } from "react";
import styled from "@emotion/styled";
import api from "api";
import { useQuery } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../contexts/auth";
import { ReactQueryDevtools } from "react-query/devtools";
import { BookmarkFilledIcon } from "assets/icons/BookmarkFilled";
import { BookmarkNoColor } from "assets/icons/BookmarkNoColor";
import Link from "next/link";
import Version, { getVersionsByGroup } from "../components/core/version";
import Header from "../components/core/header";
import { Header as PageHeader } from "../components/core/Page";
import {
  MainWrapper,
  MiddleColumn,
  Content,
  LeftColumnRedoc,
  LeftColumnRedocWrapper,
  NavHeader,
  CategoryRedoc,
} from "../components/core/components";
// import { HomeIcon, ChevronRight } from "../components/core/icons";
import Footer from "../components/core/Footer/Footer";

import {
  VersionProvider,
  RatingProvider,
  PromotionProvider,
} from "../contexts";
const queryClient = new QueryClient();

const Bookmarks = () => {
  const versionGroup = "";
  //   const router = useRouter();
  const versions = getVersionsByGroup(versionGroup);

  const [selectedVersion, setSelectedVersion] = useState(
    versions.STABLE_VERSION
  );
  const promotionContext = {
    isActive: false,
    content: (
      <div>
        Master LiveChat Design System at the
        <a
          href="https://developers.livechat.com/live-coding-livechat-design-system-in-use/"
          rel="noopener nofollow"
          target="_blank"
        >
          live coding session
        </a>
        on Sept 16, 5 pm CEST.
      </div>
    ),
  };
  const versionContext = {
    selected: selectedVersion,
    items: versions,
  };

  const ORG_ID = process.env.NEXT_PUBLIC_FULLSTORY_ORG;

  const Wrapper = styled.div`
    width: 100%;
    max-width: 1248px;
    margin-left: 93px;
    padding-bottom: 10vh;
    position: relative;
  `;

  const BookmarksList = styled.ul`
    border: 1px solid #e4e8ec;
    width: 100%;
    border-radius: 4px;
    margin: 0;
    padding: 0;
    li:first-child {
      background-color: #f0f3f5;
      padding: 8px 0 8px 11px;
      border-bottom: none;
    }
    li {
      margin: 0;
      list-style: none;
      border-bottom: 1px solid #e4e8ec;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 26px 8px 20px;
      span {
        margin: 0 7px;
      }
    }
    li:last-child {
      border-bottom: none;
    }
    button {
      border: none;
      height: 22px;
      margin: 0;
      padding: 0;
      background: none;
      cursor: pointer;
    }
  `;

  const fetchData = async () => api.getDPS().getAllBookmarks();
  const { isLoading, data: allBookmarks } = useQuery(
    ["allBookmarks"],
    fetchData
  );

  return (
    <AuthProvider>
      <VersionProvider value={versionContext}>
        <PromotionProvider value={promotionContext}>
          {ORG_ID && <FullStory org={ORG_ID} />}
          <Header />
          <MainWrapper>
            <Wrapper>
              <h1>Bookmarks</h1>
              <p>Your bookmarks added in the LiveChat documentation.</p>
              <BookmarksList>
                <li>Name</li>
                {isLoading ? (
                  <li>
                    <p>
                      You don't have any bookmarks yet. Click on the bookmark
                      icon{" "}
                      <span>
                        <BookmarkNoColor />
                      </span>
                      next to the document name to add your first one.
                    </p>
                  </li>
                ) : (
                  allBookmarks.map((bookmark) => {
                    return (
                      <li>
                        <div className="wrapper">
                          <Link href={`${bookmark.url}`}>{bookmark.url}</Link>
                          <p>Some title</p>
                        </div>
                        <button>
                          <BookmarkFilledIcon />
                        </button>
                      </li>
                    );
                  })
                )}
              </BookmarksList>
            </Wrapper>
          </MainWrapper>
          <Footer />
        </PromotionProvider>
      </VersionProvider>
    </AuthProvider>
  );
};

export default Bookmarks;
