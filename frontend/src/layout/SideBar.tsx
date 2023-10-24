import { Heading, VStack, Text, Divider } from "@chakra-ui/react";
import React from "react";
import useFetchGenres from "../hooks/api/useFetchGenres";
import { Link } from "@tanstack/react-router";

const SideBar = () => {
  const { data, error, isLoading } = useFetchGenres();
  return (
    <VStack alignItems={"start"}>
      <Text fontSize={35} fontWeight={"bold"} as={Link} to="/">
        GAME WOLRD
      </Text>
      <Divider my={2}></Divider>
      <Heading fontSize={25}> Genres</Heading>

      {data?.results.map((genre) => (
        <Text fontSize={18}>{genre.name}</Text>
      ))}
    </VStack>
  );
};

export default SideBar;
