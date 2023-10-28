import React from "react";
import useFetchBackend from "./useFetchBackend";
import { useQuery } from "@tanstack/react-query";
import backendClient from "../../services/backendClient";

export interface GameGuide {
  id: number;
  title: string;
  text: string;
  game: {
    id: number;
    rawgId: number;
    name: string;
  };
  user: {
    id: number;
    username: string;
  };
}

const useFetchGameGuides = (rawgId?: number, userId?: number) => {
  const { data, error, isLoading, isRefetching } = useQuery({
    queryKey: ["gameGuides", rawgId, userId],
    queryFn: () =>
      backendClient
        .get<GameGuide[]>(`/guides`, {
          params: { rawgId: rawgId, userId: userId },
        })
        .then((res) => res.data),
    select: (data) => data.sort((a, b) => b.id - a.id),
    cacheTime: 18000,
    staleTime: 18000,
  });

  return { data, error, isLoading, isRefetching };
};

export default useFetchGameGuides;
