import React from "react";
import useFetchData from "./useFetchData";

type GameList = {
  count: number;
  results: Game[];
};

export type Game = {
  id: number;
  name: string;
  background_image: string;
  released: string;
  metacritic: number;
};

const useFetchGames = () => {
  return useFetchData<GameList>("/games");
};

export default useFetchGames;
