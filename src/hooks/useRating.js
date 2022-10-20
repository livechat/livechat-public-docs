import { useState } from "react";
import { useLocalStorage } from "./";
import { RATES } from "../constant";
import { logAmplitudeEvent } from "../utils";
import { useAuth } from "../contexts/auth";
import api from "../api";

const useRating = ({ slug }) => {
  const  user  = useAuth();

  // console.log('//ANCHOR 🚀 ~ useRating ~ user', user)

  const [ratings, setRatings] = useLocalStorage("ratings", []);

  const currentRating = ratings.find(rating => rating.slug === slug);

  const [selectedRating, setSelectedRating] = useState(
    currentRating ? currentRating.rating : -1
  );

  const saveRating = async (index, position) => {
    const newRatings = ratings.filter(rating => rating.slug !== slug);
    const data = await api.getLiveChat().getMe();
    const { email } = data;

    const newRating = {
      email: email || "",
      rating: index,
      text: RATES[index],
      slug,
      position
    };

    newRatings.push(newRating);
    setRatings(newRatings);
    setSelectedRating(index);

    logAmplitudeEvent("Document rated", {
      email: email || "",
      pathname: newRating.slug,
      position: newRating.position,
      rating: newRating.rating,
      text: RATES[index],
    });
  };

  return {
    selectedRating,
    saveRating
  };
};

export default useRating;
