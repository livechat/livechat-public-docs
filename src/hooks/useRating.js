import { useState } from "react";

import { useLocalStorage } from "./";
import { RATES } from "../constant";
import { logAmplitudeEvent } from "../utils";

const useRating = ({ slug }) => {
  const [ratings, setRatings] = useLocalStorage("ratings", []);

  const currentRating = ratings.find(rating => rating.slug === slug);

  const [selectedStar, setSelectedStar] = useState(
    currentRating ? currentRating.rating : -1
  );

  const saveRating = index => {
    const newRatings = ratings.filter(rating => rating.slug !== slug);

    const newRating = {
      rating: index,
      slug
    };

    newRatings.push(newRating);
    setRatings(newRatings);
    setSelectedStar(index);

    logAmplitudeEvent("Document rated", {
      pathname: newRating.slug,
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
