import React from "react";

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { GameReview } from "../../hooks/backend/useFetchGameReviews";

interface Props {
  gameReview: GameReview;
}
const GameReviewCard = ({ gameReview }: Props) => {
  return (
    <Card
      borderRadius={"10px"}
      width={"40vw"}
      minHeight={"15vh"}
      bgColor={"whiteAlpha.200"}
    >
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading> {gameReview.user.username}</Heading>
          <Badge
            height={"30px"}
            width={"30px"}
            colorScheme={
              gameReview.rating > 3
                ? "green"
                : gameReview.rating > 2
                ? "yellow"
                : "red"
            }
            fontSize={20}
            textAlign={"center"}
          >
            {gameReview.rating}
          </Badge>
        </HStack>
      </CardHeader>
      <CardBody> {gameReview.text}</CardBody>
    </Card>
  );
};

export default GameReviewCard;
