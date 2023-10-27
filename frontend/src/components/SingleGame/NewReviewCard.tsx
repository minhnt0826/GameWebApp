import {
  Button,
  Heading,
  Input,
  Textarea,
  VStack,
  Box,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import React, { useState } from "react";
import { useAuthState } from "../../contexts/Authentication";
import NotLoggedInDialog from "../NotLoggedInDialog";

const NewReviewCard = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const { isLoggedIn } = useAuthState();

  const useDisclosureReturn = useDisclosure();

  const handlePostReview = () => {
    if (!isLoggedIn) {
      useDisclosureReturn.onOpen();
    } else {
      if (inputValue.trim() !== "" && rating > 0) {
        const formData = new FormData();
        formData.append("text", inputValue);
        formData.append("owner", "USER");
        //   sendMessageMutation.mutate(formData);
        setInputValue("");
        setRating(0);
      }
    }
  };

  const [rating, setRating] = useState(0);

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
        >
          {" "}
        </Textarea>

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
        <NotLoggedInDialog
          action={"write game reviews"}
          useDisclosureReturn={useDisclosureReturn}
        ></NotLoggedInDialog>
      </VStack>
    </>
  );
};

export default NewReviewCard;
