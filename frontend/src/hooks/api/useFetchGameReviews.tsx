import React from "react";
import useFetchData from "./useFetchData";

export type GameReview = {
  id: number;
  username: string;
  rating: number;
  reviewText: string;
};

const reviewList: GameReview[] = [
  { id: 1, username: "minhnt", rating: 10, reviewText: "This game is great" },
  {
    id: 2,
    username: "xinyuan",
    rating: 6,
    reviewText:
      "This game is not really good. It can be improved by better graphics and less bugs",
  },
];

const useFetchGameReviews = (id: number) => {
  return { gameReviews: [...reviewList] };
  //   return useFetchData<GameDetail>(`/games/${id}`);
};

export default useFetchGameReviews;
