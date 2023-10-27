import React from "react";
import useFetchGameReviews from "../../hooks/api/useFetchGameReviews";
import GameReviewCard from "./GameReviewCard";
import { Heading, Spacer, VStack } from "@chakra-ui/react";
import NewReviewCard from "./NewReviewCard";

interface Props {
  gameId: number;
}
const ReviewsTab = ({ gameId }: Props) => {
  const { gameReviews } = useFetchGameReviews(gameId);

  const userReviewed = false;

  return (
    <>
      <VStack spacing={5}>
        <NewReviewCard />
        <Spacer></Spacer>
        <Heading alignSelf={"start"}> Other reviews</Heading>
        {gameReviews.map((review) => (
          <GameReviewCard gameReview={review}></GameReviewCard>
        ))}
      </VStack>
    </>
  );
};

export default ReviewsTab;
