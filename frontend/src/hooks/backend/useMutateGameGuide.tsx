import { useMutation, useQueryClient } from "@tanstack/react-query";
import backendClient from "../../services/backendClient";

export interface NewGameGuide {
  rawgId: number;
  userId: number;
  title: string;
  text: string;
}

const useMutateGameGuide = () => {
  const gameGuideMutation = useMutation({
    mutationFn: async (newGameGuide: NewGameGuide) =>
      backendClient.post("/guides", newGameGuide),
  });

  return gameGuideMutation;
};

export const useDeleteGameGuide = () => {
  const queryClient = useQueryClient();
  const bookmarkMutation = useMutation({
    mutationFn: async (id: number) => backendClient.delete(`/guides/${id}`),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["gameGuides"] });
    },
  });

  return bookmarkMutation;
};

// export const useUpdateGameReviews = () => {
//   const gameReviewMutation = useMutation({
//     mutationFn: async (updatedGameReview: UpdateGameReview) =>
//       backendClient.put(`/reviews/${updatedGameReview.id}`, updatedGameReview),
//   });

//   return gameReviewMutation;
// };

export default useMutateGameGuide;
