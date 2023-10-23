import { useQuery } from "@tanstack/react-query";
import React from "react";
import apiClient from "../../services/apiClient";
import { AxiosRequestConfig } from "axios";

const useFetchData = <T,>(
  endpoint: string,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [endpoint],
    queryFn: () =>
      apiClient.get<T>(endpoint, axiosRequestConfig).then((res) => res.data),
  });

  return { data, error, isLoading };
};

export default useFetchData;
