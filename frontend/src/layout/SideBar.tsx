import {
  Heading,
  VStack,
  Text,
  Divider,
  Link as ChakraLink,
} from "@chakra-ui/react";
import React from "react";
import useFetchGenres from "../hooks/api/useFetchGenres";
import {
  Link as RouterLink,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

const SideBar = () => {
  const { data, error, isLoading } = useFetchGenres();

  const navigate = useNavigate();

  // @ts-ignore
  const { genres } = useSearch();

  return (
    <VStack alignItems={"start"}>
      <Text fontSize={35} fontWeight={"bold"} as={RouterLink} to="/">
        GAME WOLRD
      </Text>
      <Divider my={2}></Divider>
      <Heading fontSize={25}> Genres</Heading>

      {data?.results.map((genre) => (
        <Text
          as={ChakraLink}
          onClick={() => {
            navigate({
              to: "/games",
              search: (prev) => ({ genres: genre.id }),
            });
          }}
          fontSize={genres && genres == genre.id ? 22 : 18}
          fontWeight={genres && genres == genre.id ? "bold" : "normal"}
        >
          {genre.name}
        </Text>
      ))}
    </VStack>
  );
};

export default SideBar;
