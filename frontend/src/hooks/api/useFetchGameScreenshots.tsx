import React from "react";
import useFetchData from "./useFetchData";

interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
}

interface GameScreenshots {
  count: number;
  results: Screenshot[];
}

const useFetchGameScreenshots = (id: number) => {
  return useFetchData<GameScreenshots>(`/games/${id}/screenshots`);
};
export default useFetchGameScreenshots;
