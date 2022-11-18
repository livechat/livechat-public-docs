import styled from "@emotion/styled";
import api from "api";
import { BookmarkFilledIcon } from "assets/icons/BookmarkFilled";
import { BookmarkHollowIcon } from "assets/icons/BookmarkHollow";
import { useUpdateBookmarks } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../../contexts/auth";

import LoginModal from "./LoginModal";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  margin-left: 20px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  :hover {
    background-color: #f6f6f7;
  }
`;

const Bookmark = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthorized } = useAuth();
  const { pathname } = useRouter();
  const { updateBookmarks } = useUpdateBookmarks();
  const fetchData = async () => api.getDPS().getAllBookmarks();
  const { isLoading, data: allBookmarks } = useQuery(
    ["allBookmarks"],
    fetchData
  );
  const linkType = "bookmark";
  const newBookmark = [{ type: linkType, url: pathname }];

  const handleBookmarkClick = () => {
    if (!isAuthorized) {
      setIsModalOpen(true);
    }
    if (!isLoading) {
      if (isBookmarked) {
        setIsBookmarked(false);
        const filteredBookmarks = allBookmarks.filter(
          (singleBookmark) => singleBookmark.url !== pathname
        );
        updateBookmarks(filteredBookmarks);
      } else {
        setIsBookmarked(true);
        const updatedBookmarks = [...allBookmarks, ...newBookmark];
        updateBookmarks(updatedBookmarks);
      }
    }
  };
  useEffect(() => {
    if (!isLoading && isAuthorized) {
      allBookmarks.some((bookmark) => {
        bookmark.url === pathname ? setIsBookmarked(true) : "";
      });
    }
  }, [allBookmarks]);

  return (
    <>
      <Container onClick={handleBookmarkClick}>
        {isBookmarked ? <BookmarkFilledIcon /> : <BookmarkHollowIcon />}
      </Container>
      {isModalOpen && (
        <LoginModal
          setIsBookmarked={setIsBookmarked}
          isOpen={isModalOpen}
          handleModalClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Bookmark;
