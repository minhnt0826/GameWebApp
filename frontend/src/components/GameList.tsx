import React from "react";
import useFetchGames from "../hooks/api/useFetchGames";
import { SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";

const GameList = () => {
  const { data, error, isLoading } = useFetchGames();

  return (
    <>
      <SimpleGrid spacing={5} columns={3}>
        {data?.results.map((game) => (
          <GameCard game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameList;
