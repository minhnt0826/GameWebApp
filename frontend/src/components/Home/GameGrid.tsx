import React, { useEffect } from "react";
import { GameList } from "../../hooks/api/useFetchGames";
import { HStack, SimpleGrid, Spinner } from "@chakra-ui/react";
import GameCard from "./GameCard";

interface Props {
  gameList: GameList;
}

const GameGrid = ({ gameList }: Props) => {
  return (
    <>
      <SimpleGrid spacing={5} columns={3}>
        {gameList.results.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
