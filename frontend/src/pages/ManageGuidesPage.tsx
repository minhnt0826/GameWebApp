import React, { useEffect, useState } from "react";
import { useAuthState } from "../contexts/Authentication";
import {
  Grid,
  GridItem,
  Heading,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import useFetchUserProfile, {
  UserProfile,
} from "../hooks/backend/useFetchUserProfile";
import useMutateUserProfile from "../hooks/backend/useMutateUserProfile";
import useFetchGameGuides, {
  GameGuide,
} from "../hooks/backend/useFetchGameGuides";
import GuideCard from "../components/ManageGuides/GuideCard";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteGameGuide } from "../hooks/backend/useMutateGameGuide";
import { useQueryClient } from "@tanstack/react-query";

const ManageGuidesPage = () => {
  const { isLoggedIn, userId } = useAuthState();

  if (!(isLoggedIn && userId)) {
    return (
      <>
        <Text> Unauthorised. You have to login first </Text>
      </>
    );
  }

  const { data, error, isLoading, isRefetching } = useFetchGameGuides(
    undefined,
    userId
  );

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deleteGuideMutation = useDeleteGameGuide();

  const handleDeleteGameGuide = (guideId: number) => {
    deleteGuideMutation.mutate(guideId);

    // queryClient.setQueryData<GameGuide[]>(
    //   ["gameGuides", undefined, userId],
    //   // @ts-ignore
    //   (old) => old.filter((t) => t.id !== guideId)
    // );
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
          <HStack justifyContent={"space-between"}>
            {" "}
            <Heading alignSelf={"start"} fontSize={45} mb={5}>
              Your Game Guides
            </Heading>
          </HStack>
          {data ? (
            <VStack spacing={4} alignItems={"start"}>
              {data.map((guide) => (
                <GuideCard
                  handleDeleteGameGuide={handleDeleteGameGuide}
                  gameGuide={guide}
                />
              ))}
            </VStack>
          ) : (
            <Spinner> </Spinner>
          )}
          {isRefetching ? <Spinner> </Spinner> : null}
          {deleteGuideMutation.isLoading ? <Spinner> </Spinner> : null}
        </GridItem>
      </Grid>
    </>
  );
};

export default ManageGuidesPage;
