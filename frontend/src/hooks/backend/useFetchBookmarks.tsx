import React from "react";
import useFetchBackend from "./useFetchBackend";
import { useQuery } from "@tanstack/react-query";

interface Bookmark {
  gameId: number;
  gameName: string;
}
const useFetchBookmarks = (id: number) => {
  const bookmarks: Bookmark[] = [
    { gameId: 3498, gameName: "Grand Theft Auto V" },
    { gameId: 3328, gameName: "The Witcher 3: Wild Hunt" },
  ];

  const { data, error, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () => {
      return bookmarks;
    },
    cacheTime: 18000,
    staleTime: 18000,
  });

  //   return useFetchBackend<number[]>(`/users/${id}/bookmarks`);
  return { data };
};

export default useFetchBookmarks;
