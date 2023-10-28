import { Badge, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { GameDetail } from "../../hooks/api/useFetchGameDetail";

interface Props {
  gameDetail: GameDetail;
}

const RatingBar = ({ gameDetail }: Props) => {
  return (
    <HStack spacing={5}>
      <VStack>
        <Badge
          borderRadius={"10px"}
          pt={1}
          width={"50px"}
          height={"50px"}
          textAlign={"center"}
          alignItems={"center"}
          fontSize={25}
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
        <Text fontSize={13}> Metacritic </Text>
      </VStack>
      <VStack>
        <Badge
          pt={1}
          borderRadius={"10px"}
          width={"50px"}
          height={"50px"}
          textAlign={"center"}
          alignItems={"center"}
          fontSize={25}
          colorScheme={
            gameDetail.rating > 3
              ? "green"
              : gameDetail.rating > 2
              ? "yellow"
              : "red"
          }
        >
          {gameDetail.rating.toFixed(1)}
        </Badge>
        <Text fontSize={13}> Users' Rating</Text>
      </VStack>
    </HStack>
  );
};

export default RatingBar;
