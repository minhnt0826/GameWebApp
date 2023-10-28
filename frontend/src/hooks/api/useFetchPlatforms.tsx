import React from "react";
import useFetchData from "./useFetchData";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";

export interface Platform {
  id: number;
  name: string;
}

interface PlatformList {
  count: number;
  results: Platform[];
}

const useFetchPlatforms = () => {
  const { data, error, isLoading } = useQuery<PlatformList>({
    queryKey: ["platforms"],
    queryFn: () =>
      apiClient
        .get<PlatformList>("/platforms/lists/parents")
        .then((res) => res.data),

    cacheTime: 18000,
    staleTime: 18000,
  });

  return { data, error, isLoading };
};

export default useFetchPlatforms;
