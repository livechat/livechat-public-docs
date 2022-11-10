import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useAuth } from "../../../contexts/auth";
import { useRouter } from "next/router";
import { useUpdateBookmarks } from "hooks";
import BookmarkIcon from "./BookmarkIcon";
import LoginModal from "./loginmodal";
import api from "api";

const Bookmark = () => {
  const [isBookmarked, setBookmark] = useState("");
  const { authorize, isAuthorized, user } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const pagePath = router.pathname;

  const { updateBookmarks } = useUpdateBookmarks();

  const fetchData = async () => {
    const bookmarks = await api.getDPS().getAllBookmarks();
    return bookmarks;
  };

  const { isLoading, data: allBookmarks } = useQuery(
    ["allBookmarks"],
    fetchData
  );

  const newBookmark = [{ type: "bookmark", url: pagePath }];

  const handleBookmarkClick = () => {
    if (isAuthorized) {
      fetchData();
      if (isBookmarked) {
        setBookmark(false);
        const filteredBookmarks = Object.values(allBookmarks).filter(
          (singleBookmark) => singleBookmark.url !== pagePath
        );

        updateBookmarks(filteredBookmarks);
      } else {
        setBookmark(true);
        const updatedBookmarks = [...allBookmarks, ...newBookmark];
        updateBookmarks(updatedBookmarks);
      }
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthorized) {
      Object.values(allBookmarks).some((element) => {
        if (element.url === pagePath) {
          setBookmark(true);
          return true;
        }
        setBookmark(false);
        return false;
      });
    }
  });

  return (
    <>
      <BookmarkIcon
        isBookmarked={isBookmarked}
        handleClick={() => handleBookmarkClick()}
        isLoading={isLoading}
      />
      {isModalOpen && (
        <LoginModal
          setBookmark={setBookmark}
          authorize={authorize}
          isOpen={isModalOpen}
          handleModalClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default Bookmark;
