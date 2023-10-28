import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import backendClient from "../../services/backendClient";

export interface NewGame {
  name: string;
  rawgId: number;
}

const useMutateGame = () => {
  const newGameMutation = useMutation({
    mutationFn: async (newGame: NewGame) =>
      backendClient.post("/games", newGame),
  });

  return newGameMutation;
};

export default useMutateGame;
