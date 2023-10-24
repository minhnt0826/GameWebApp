import { Badge, HStack } from "@chakra-ui/react";
import React from "react";
import { GameDetail } from "../../hooks/api/useFetchGameDetail";

interface Props {
  gameDetail: GameDetail;
}

const RatingBar = ({ gameDetail }: Props) => {
  return (
    <HStack spacing={5}>
      <Badge
        fontSize={20}
        colorScheme={
          gameDetail.metacritic > 80
            ? "green"
            : gameDetail.metacritic > 60
            ? "yellow"
            : "red"
        }
      >
        {gameDetail.metacritic}
      </Badge>
      <Badge fontSize={20}> {gameDetail.rating.toFixed(1)}</Badge>
    </HStack>
  );
};

export default RatingBar;
