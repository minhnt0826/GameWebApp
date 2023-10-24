import React from "react";
import useFetchData from "./useFetchData";

type Publisher = {
  id: number;
  name: string;
};

type Developer = {
  id: number;
  name: string;
};

type Genre = {
  id: number;
  name: string;
};

type Tag = {
  id: number;
  name: string;
};

type Platform = {
  platform: {
    id: number;
    name: string;
  };
};

export type GameDetail = {
  id: number;
  name: string;
  background_image: string;
  released: string;
  metacritic: number;
  rating: number;
  description: string;
  publishers: Publisher[];
  developers: Developer[];
  platforms: Platform[];
  tags: Tag[];
  genres: Genre[];
};

const useFetchGameDetail = (id: string) => {
  return useFetchData<GameDetail>(`/games/${id}`);
};

export default useFetchGameDetail;
