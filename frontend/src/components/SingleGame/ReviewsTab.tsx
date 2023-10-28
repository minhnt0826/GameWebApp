import React from "react";
import GameReviewCard from "./GameReviewCard";
import { Heading, Spacer, Spinner, VStack } from "@chakra-ui/react";
import NewReviewCard from "./NewReviewCard";
import useFetchGameReviews from "../../hooks/backend/useFetchGameReviews";
import { useAuthState } from "../../contexts/Authentication";
import ModifyReviewCard from "./ModifyReviewCard";

interface Props {
  gameId: number;
}
const ReviewsTab = ({ gameId }: Props) => {
  console.log(gameId);

  const {
    data: gameReviews,
    error,
    isLoading,
    isRefetching,
  } = useFetchGameReviews(gameId);

  const { isLoggedIn, userId } = useAuthState();

  var userGameReview = gameReviews?.find((e) => e.user.id == userId);

  return (
    <>
      {gameReviews ? (
        <VStack spacing={5}>
          {userGameReview ? (
            <ModifyReviewCard gameId={gameId} gameReview={userGameReview} />
          ) : (
            <NewReviewCard gameId={gameId} />
          )}

          <Spacer></Spacer>
          <Heading alignSelf={"start"}> Other reviews</Heading>

          {gameReviews.map((review) => (
            <GameReviewCard gameReview={review}></GameReviewCard>
          ))}
        </VStack>
      ) : (
        <Spinner> </Spinner>
      )}
    </>
  );
};

export default ReviewsTab;
