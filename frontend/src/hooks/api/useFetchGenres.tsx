import React from "react";
import useFetchData from "./useFetchData";

type GenreResponse = {
  count: number;
  results: Genre[];
};

export type Genre = {
  id: number;
  name: string;
  games_count: string;
  image_background: string;
};

const useFetchGenres = () => {
  return useFetchData<GenreResponse>("/genres");
};

export default useFetchGenres;
