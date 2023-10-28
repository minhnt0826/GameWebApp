import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import backendClient from "../../services/backendClient";

export interface NewGameReview {
  userId: number;
  rawgId: number;
  text: string;
  rating: number;
}

export interface UpdateGameReview {
  id: number;
  userId: number;
  rawgId: number;
  text: string;
  rating: number;
}

const useMutateGameReviews = () => {
  const gameReviewMutation = useMutation({
    mutationFn: async (newGameReview: NewGameReview) =>
      backendClient.post("/reviews", newGameReview),
  });

  return gameReviewMutation;
};

export const useUpdateGameReviews = () => {
  const gameReviewMutation = useMutation({
    mutationFn: async (updatedGameReview: UpdateGameReview) =>
      backendClient.put(`/reviews/${updatedGameReview.id}`, updatedGameReview),
  });

  return gameReviewMutation;
};

export default useMutateGameReviews;
