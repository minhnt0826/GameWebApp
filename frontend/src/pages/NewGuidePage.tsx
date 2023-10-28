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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import { useAuthState } from "../contexts/Authentication";
import useMutateGameReviews from "../hooks/backend/useMutateGameReviews";
import useMutateGameGuide from "../hooks/backend/useMutateGameGuide";
import { useNavigate, useParams } from "@tanstack/react-router";

interface Props {
  gameId: number;
}

interface GameGuide {
  title: string;
  text: string;
}

const NewGuidePage = () => {
  const [newGameGuide, setNewGameGuide] = useState<GameGuide>({} as GameGuide);

  // @ts-ignore
  const { id } = useParams();

  const { userId, isLoggedIn } = useAuthState();

  const useDisclosureReturn = useDisclosure();

  const gameGuideMutation = useMutateGameGuide();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handlePostGuide = () => {
    if (!(isLoggedIn && userId)) {
      useDisclosureReturn.onOpen();
    } else {
      if (newGameGuide.text.trim() !== "" && newGameGuide.title.trim() !== "") {
        gameGuideMutation.mutate(
          {
            rawgId: Number.parseInt(id),
            userId: userId,
            text: newGameGuide.text,
            title: newGameGuide.title,
          },
          {
            onSettled: () => {
              queryClient.refetchQueries(["gameGuides", undefined, userId]);
              navigate({ to: "/guides" });
            },
          }
        );
      }
    }
  };

  return (
    <>
      <Grid
        templateAreas={`"sidebar header"
                  "sidebar main"`}
      >
        <GridItem area={"header"}>
          <Header />
        </GridItem>
        <GridItem
          area={"sidebar"}
          width={"18vw"}
          bgColor={"#293042"}
          p={5}
          minH={"100vh"}
        >
          <SideBar />
        </GridItem>
        <GridItem area={"main"} pl={10} width={"78vw"} minHeight={"100vh"}>
          <VStack alignItems={"start"} width={"50%"}>
            <Heading mb={2} alignSelf={"start"}>
              Write your game guide!
            </Heading>
            <Textarea
              placeholder="Type title..."
              value={newGameGuide.title}
              onChange={(e) =>
                setNewGameGuide({ ...newGameGuide, title: e.target.value })
              }
              borderRadius={"10px"}
              height={"1vh"}
              bgColor={"whiteAlpha.200"}
              resize={"none"}
              mb={5}
            ></Textarea>

            <Textarea
              placeholder="Type game guide..."
              value={newGameGuide.text}
              onChange={(e) =>
                setNewGameGuide({ ...newGameGuide, text: e.target.value })
              }
              borderRadius={"10px"}
              height={"30vh"}
              bgColor={"whiteAlpha.200"}
              mb={5}
            ></Textarea>

            <Button alignSelf={"end"} onClick={handlePostGuide}>
              Post game guide
            </Button>
            {gameGuideMutation.isLoading ? (
              <Spinner alignSelf={"end"}> </Spinner>
            ) : null}
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default NewGuidePage;
