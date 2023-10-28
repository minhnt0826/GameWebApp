import React from "react";
import useFetchData from "./useFetchData";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";
import useMutateGame from "../backend/useMutateGame";

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
  const newGameMutation = useMutateGame();

  const { data, error, isLoading } = useQuery<GameDetail>({
    queryKey: ["gamesDetail", id],
    queryFn: () =>
      apiClient.get<GameDetail>(`/games/${id}`).then((res) => res.data),
    select: (data) => data,

    onSuccess: (data) => {
      newGameMutation.mutate({
        name: data.name,
        rawgId: data.id,
      });
    },
    cacheTime: 18000,
    staleTime: 18000,
  });

  return { data, error, isLoading };
};

export default useFetchGameDetail;
