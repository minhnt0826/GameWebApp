import {
  Button,
  Heading,
  Input,
  Textarea,
  VStack,
  Box,
  IconButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import React, { useState } from "react";
import { useAuthState } from "../../contexts/Authentication";
import NotLoggedInDialog from "../NotLoggedInDialog";
import useMutateGameReviews from "../../hooks/backend/useMutateGameReviews";
import { GameDetail } from "../../hooks/api/useFetchGameDetail";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  gameId: number;
}

const NewReviewCard = ({ gameId }: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [rating, setRating] = useState(0);

  const { userId, isLoggedIn } = useAuthState();

  const useDisclosureReturn = useDisclosure();

  const gameReviewMutation = useMutateGameReviews();

  const queryClient = useQueryClient();

  const handlePostReview = () => {
    if (!(isLoggedIn && userId)) {
      useDisclosureReturn.onOpen();
    } else {
      if (inputValue.trim() !== "" && rating > 0) {
        gameReviewMutation.mutate(
          {
            rawgId: gameId,
            userId: userId,
            text: inputValue,
            rating: rating,
          },
          {
            onSettled: () => {
              queryClient.refetchQueries(["gameReviews", gameId]);
            },
          }
        );
      }
    }
  };

  return (
    <>
      <VStack>
        <Heading alignSelf={"start"}> Write your own review! </Heading>
        <Textarea
          placeholder="Type your review..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          borderRadius={"10px"}
          width={"40vw"}
          height={"15vh"}
          bgColor={"whiteAlpha.200"}
          resize={"none"}
        ></Textarea>

        <Box alignSelf={"start"}>
          {[1, 2, 3, 4, 5].map((value) => (
            <IconButton
              key={value}
              icon={<StarIcon />}
              color={value <= rating ? "yellow.400" : "gray.300"}
              onClick={() => setRating(value)}
              aria-label={`Rate ${value}`}
            />
          ))}
        </Box>
        <Button alignSelf={"end"} onClick={handlePostReview}>
          Post review
        </Button>
        {gameReviewMutation.isLoading ? <Spinner> </Spinner> : null}

        <NotLoggedInDialog
          action={"write game reviews"}
          useDisclosureReturn={useDisclosureReturn}
        ></NotLoggedInDialog>
      </VStack>
    </>
  );
};

export default NewReviewCard;
