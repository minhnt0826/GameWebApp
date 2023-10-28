import React from "react";
import backendClient from "../../services/backendClient";
import { useQuery } from "@tanstack/react-query";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

const useFetchUserProfile = (userId: number) => {
  const { data, error, isLoading, isRefetching } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () =>
      backendClient
        .get<UserProfile>(`/users/${userId}`)
        .then((res) => res.data),
    cacheTime: 18000,
    staleTime: 18000,
  });

  return { data, error, isLoading, isRefetching };
};

export default useFetchUserProfile;
