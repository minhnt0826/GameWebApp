import React from "react";
import useFetchBookmarks from "../../hooks/backend/useFetchBookmarks";
import { Heading, VStack, Text, Link, Spinner } from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  userId: number;
}
const BookmarkList = ({ userId }: Props) => {
  const navigate = useNavigate();

  const { data: bookmarks } = useFetchBookmarks(userId);

  return (
    <>
      <VStack alignItems={"start"}>
        <Heading fontSize={25}> Your Bookmarks </Heading>
        {bookmarks ? (
          bookmarks.map((bookmark) => (
            <Text
              as={Link}
              onClick={() =>
                navigate({
                  to: "/games/$id",
                  params: { id: bookmark.gameId.toString() },
                })
              }
            >
              {bookmark.gameName}
            </Text>
          ))
        ) : (
          <Spinner> </Spinner>
        )}
      </VStack>
    </>
  );
};

export default BookmarkList;
