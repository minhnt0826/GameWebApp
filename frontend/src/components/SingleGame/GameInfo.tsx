import {
  Box,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { GameDetail } from "../../hooks/api/useFetchGameDetail";

interface Props {
  gameDetail: GameDetail;
}

const GameInfo = ({ gameDetail }: Props) => {
  return (
    <>
      <VStack align={"start"}>
        <Heading fontSize={35}> Game Info </Heading>
        <SimpleGrid columns={2} spacing={5}>
          <VStack align={"start"}>
            <Heading fontSize={25}> Genres </Heading>
            <Text>
              {gameDetail.genres.map((genre, id) => {
                return id == 0 ? genre.name : ", " + genre.name;
              })}
            </Text>
          </VStack>

          <VStack align={"start"}>
            <Heading fontSize={25}> Developers </Heading>
            <Text>
              {gameDetail.developers.map((developer, id) => {
                return id == 0 ? developer.name : ", " + developer.name;
              })}
            </Text>
          </VStack>

          <VStack align={"start"}>
            <Heading fontSize={25}> Platforms </Heading>
            <Text>
              {gameDetail.platforms.map((platform, id) => {
                return id == 0
                  ? platform.platform.name
                  : ", " + platform.platform.name;
              })}
            </Text>
          </VStack>

          <VStack align={"start"}>
            <Heading fontSize={25}> Features </Heading>
            <Text>
              {gameDetail.tags.map((tag, id) => {
                return id == 0 ? tag.name : ", " + tag.name;
              })}
            </Text>
          </VStack>
        </SimpleGrid>
      </VStack>
    </>
  );
};

export default GameInfo;
