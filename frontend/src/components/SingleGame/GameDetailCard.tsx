import React from "react";
import { GameDetail } from "../../hooks/api/useFetchGameDetail";
import {
  AspectRatio,
  Badge,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import RatingBar from "./RatingBar";

interface Props {
  gameDetail: GameDetail;
}

const GameDetailCard = ({ gameDetail }: Props) => {
  return (
    <Card borderRadius={"25px"} width={"76vw"}>
      <CardBody>
        <HStack alignItems={"flex-start"}>
          <AspectRatio ratio={1} width={"22%"} mr={6}>
            <Image borderRadius={"12px"} src={gameDetail.background_image} />
          </AspectRatio>
          <VStack alignItems={"flex-start"}>
            <Heading fontSize={50}> {gameDetail.name}</Heading>
            <Text fontSize={18}>
              {`${gameDetail.publishers[0].name}.`} {" Released: "}
              {gameDetail.released}
            </Text>
            <RatingBar gameDetail={gameDetail} />
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameDetailCard;
