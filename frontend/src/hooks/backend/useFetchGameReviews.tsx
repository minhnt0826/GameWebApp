import React from "react";
import useFetchBackend from "./useFetchBackend";
import { useQuery } from "@tanstack/react-query";
import backendClient from "../../services/backendClient";

export interface GameReview {
  id: number;
  text: string;
  rating: number;
  user: {
    id: number;
    username: string;
  };
}

const useFetchGameReviews = (rawgId: number) => {
  const { data, error, isLoading, isRefetching } = useQuery({
    queryKey: ["gameReviews", rawgId],
    queryFn: () =>
      backendClient
        .get<GameReview[]>(`/reviews`, {
          params: { rawgId: rawgId },
        })
        .then((res) => res.data),
    cacheTime: 18000,
    staleTime: 18000,
  });

  //   return useFetchBackend<number[]>(`/users/${id}/bookmarks`);
  return { data, error, isLoading, isRefetching };
};

export default useFetchGameReviews;
