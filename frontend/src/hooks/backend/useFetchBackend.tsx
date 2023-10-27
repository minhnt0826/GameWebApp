import { useQuery } from "@tanstack/react-query";
import React from "react";
import backendClient from "../../services/backendClient";
import { AxiosRequestConfig } from "axios";

const useFetchBackend = <T,>(
  endpoint: string,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { data, error, isLoading } = useQuery<T>({
    queryKey: [endpoint, axiosRequestConfig],
    queryFn: () =>
      backendClient
        .get<T>(endpoint, axiosRequestConfig)
        .then((res) => res.data),
    select: (data) => data,
    cacheTime: 18000,
    staleTime: 18000,
  });

  // console.log(axiosRequestConfig);

  return { data, error, isLoading };
};

export default useFetchBackend;
