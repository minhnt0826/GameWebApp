import React from "react";
import useFetchData from "./useFetchData";
import { Platform } from "./useFetchPlatforms";
import { Genre } from "./useFetchGenres";

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
}

const useFetchGames = (gameSearchParams: GameSearchParams) => {
  return useFetchData<GameList>("/games", {
    params: {
      genres: gameSearchParams.genreId,
      platforms: gameSearchParams.platformId,
      ordering: gameSearchParams.ordering,
    },
  });
};

export default useFetchGames;
