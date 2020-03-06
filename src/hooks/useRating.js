import { useState } from "react";

import { useLocalStorage } from "./";
import { RATES } from "../constant";
import { logAmplitudeEvent } from "../utils";

const useRating = () => {
  const [ratings, setRatings] = useLocalStorage("ratings", []);

  const currentRating = ratings.find(
    rating => rating.pathname === window.location.pathname
  );

  const [selectedStar, setSelectedStar] = useState(
    currentRating ? currentRating.rating : -1
  );

  const saveRating = index => {
    const newRatings = ratings.filter(
      r => r.pathname !== window.location.pathname
    );
    const newRating = {
      rating: index,
      pathname: window.location.pathname
    };
    newRatings.push(newRating);
    setRatings(newRatings);
    setSelectedStar(index);
    logAmplitudeEvent("Document rated", {
      pathname: newRating.pathname,
      rating: newRating.rating,
      text: RATES[index]
    });
  };

  return {
    selectedStar,
    saveRating
  };
};

export default useRating;
