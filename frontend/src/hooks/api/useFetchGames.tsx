import React from "react";
import useFetchData from "./useFetchData";
import { Platform } from "./useFetchPlatforms";
import { Genre } from "./useFetchGenres";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";
import useMutateGame from "../backend/useMutateGame";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  released: string;
  metacritic: number;
}

export interface GameList {
  count: number;
  results: Game[];
}

export interface GameSearchParams {
  genreId?: number;
  platformId?: number;
  ordering?: string;
  publisherId?: number;
  developerId?: number;
}

const useFetchGames = (gameSearchParams: GameSearchParams) => {
  const params = {
    genres: gameSearchParams.genreId,
    platforms: gameSearchParams.platformId,
    ordering: gameSearchParams.ordering,
    publishers: gameSearchParams.publisherId,
    developers: gameSearchParams.developerId,
  };

  const { data, error, isLoading } = useQuery<GameList>({
    queryKey: ["games", params],
    queryFn: () =>
      apiClient
        .get<GameList>("/games", {
          params: {
            ...params,
          },
        })
        .then((res) => res.data),
    select: (data) => data,
    cacheTime: 18000,
    staleTime: 18000,
  });

  return { data, error, isLoading };
};

export default useFetchGames;
