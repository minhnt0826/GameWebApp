import { Text, Box, VStack, Heading } from "@chakra-ui/react";
import React from "react";
import { GameDetail } from "../../hooks/api/useFetchGameDetail";

interface Props {
  gameDetail: GameDetail;
}

const GameDescription = ({ gameDetail }: Props) => {
  return (
    <>
      <VStack align={"start"} spacing={3}>
        <Heading> Description </Heading>
        <Text dangerouslySetInnerHTML={{ __html: gameDetail.description }} />;
      </VStack>
    </>
  );
};

export default GameDescription;
