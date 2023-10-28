import {
  Heading,
  VStack,
  Text,
  Divider,
  Link as ChakraLink,
  HStack,
  Image,
  Spacer,
  Link,
} from "@chakra-ui/react";
import React from "react";
import useFetchGenres from "../hooks/api/useFetchGenres";
import {
  Link as RouterLink,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import useFetchBookmarks from "../hooks/backend/useFetchBookmarks";
import { useAuthState } from "../contexts/Authentication";
import BookmarkList from "../components/Sidebar/BookmarkList";

const SideBar = () => {
  const { data, error, isLoading } = useFetchGenres();

  const { isLoggedIn, userId } = useAuthState();

  const navigate = useNavigate();

  // @ts-ignore
  const { genres } = useSearch();

  return (
    <VStack alignItems={"start"}>
      <Text fontSize={35} fontWeight={"bold"} as={RouterLink} to="/">
        GAME WOLRD
      </Text>
      <Divider my={2}></Divider>
      {isLoggedIn && userId ? <BookmarkList userId={userId} /> : null}

      <Heading
        as={Link}
        onClick={() => navigate({ to: "/guides" })}
        fontSize={25}
      >
        Manage your guides
      </Heading>
      <Divider my={2}></Divider>

      <Heading fontSize={25}> Genres</Heading>

      {data?.results.map((genre) => (
        <HStack>
          <Image
            boxSize={"32px"}
            borderRadius={"6px"}
            src={genre.image_background}
          ></Image>
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
        </HStack>
      ))}
      <Spacer></Spacer>
    </VStack>
  );
};

export default SideBar;
