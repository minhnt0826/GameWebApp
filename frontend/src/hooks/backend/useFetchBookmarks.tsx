import React from "react";
import useFetchBackend from "./useFetchBackend";
import { useQuery } from "@tanstack/react-query";
import backendClient from "../../services/backendClient";

interface GameBookmark {
  id: number;
  rawgId: number;
  name: string;
}

// const bookmarks: Bookmark[] = [
//   { gameId: 3498, gameName: "Grand Theft Auto V" },
//   { gameId: 3328, gameName: "The Witcher 3: Wild Hunt" },
// ];

const useFetchBookmarks = (id: number) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: () =>
      backendClient
        .get<GameBookmark[]>(`/users/${id}/bookmarks`)
        .then((res) => res.data.sort((a, b) => a.id - b.id)),
    cacheTime: 18000,
    staleTime: 18000,
  });

  //   return useFetchBackend<number[]>(`/users/${id}/bookmarks`);
  return { data, error, isLoading };
};

export default useFetchBookmarks;
