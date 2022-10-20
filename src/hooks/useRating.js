import { useState } from "react";
import { useLocalStorage } from "./";
import { logAmplitudeEvent } from "../utils";

const useRating = ({ slug }) => {
  const [ratings, setRatings] = useLocalStorage("ratings", []);

  const currentRating = ratings.find(rating => rating.slug === slug);

  const [selectedRating, setSelectedRating] = useState(
    currentRating ? currentRating.rating : -1
  );

  const saveRating = (index, position, email) => {
    const newRatings = ratings.filter(rating => rating.slug !== slug);

    const newRating = {
      rating: index,
      slug,
    };

    newRatings.push(newRating);
    setRatings(newRatings);
    setSelectedRating(index);

    logAmplitudeEvent("Document rated", {
      email,
      pathname: slug,
      position,
      rating: index
    });
  };

  return {
    selectedRating,
    saveRating
  };
};

export default useRating;
