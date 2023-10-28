import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import backendClient from "../../services/backendClient";

export interface BookmarkInfo {
  userId: number;
  game: GameBookmark;
}

interface GameBookmark {
  rawgId: number;
  name: string;
}

const useMutateBookmarks = () => {
  const queryClient = useQueryClient();
  const bookmarkMutation = useMutation({
    mutationFn: async (bookmarkInfo: BookmarkInfo) =>
      backendClient.post(
        `users/${bookmarkInfo.userId}/bookmarks`,
        bookmarkInfo.game
      ),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["bookmarks"] });
    },
  });

  return bookmarkMutation;
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();
  const bookmarkMutation = useMutation({
    mutationFn: async (bookmarkInfo: BookmarkInfo) =>
      backendClient.delete(`users/${bookmarkInfo.userId}/bookmarks`, {
        data: bookmarkInfo.game,
      }),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["bookmarks"] });
    },
  });

  return bookmarkMutation;
};

export default useMutateBookmarks;
