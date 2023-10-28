import React from "react";
import backendClient from "../../services/backendClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserProfile } from "./useFetchUserProfile";

const useMutateUserProfile = (userId: number) => {
  const queryClient = useQueryClient();
  const bookmarkMutation = useMutation({
    mutationFn: async (userProfile: UserProfile) =>
      backendClient.put(`users/${userId}`, userProfile),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["userProfile"] });
    },
  });

  return bookmarkMutation;
};

export default useMutateUserProfile;
