import React from "react";
import useFetchBookmarks, {
  GameBookmark,
} from "../../hooks/backend/useFetchBookmarks";
import {
  Heading,
  VStack,
  Text,
  Link,
  Spinner,
  HStack,
  IconButton,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { CloseIcon } from "@chakra-ui/icons";
import { useDeleteBookmark } from "../../hooks/backend/useMutateBookmarks";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  userId: number;
}
const BookmarkList = ({ userId }: Props) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: bookmarks,
    isLoading,
    isRefetching,
  } = useFetchBookmarks(userId);

  const deleteBookmarkMutation = useDeleteBookmark();

  return (
    <>
      <VStack alignItems={"start"}>
        <Heading fontSize={25}> Your bookmarks </Heading>
        {bookmarks ? (
          bookmarks.map((bookmark) => (
            <HStack justify={"space-between"} minWidth={"16vw"}>
              <Text
                as={Link}
                onClick={() =>
                  navigate({
                    to: "/games/$id",
                    params: { id: bookmark.rawgId.toString() },
                  })
                }
              >
                {bookmark.name}
              </Text>

              <IconButton
                boxSize={5}
                width={"5px"}
                icon={<CloseIcon boxSize={2} />}
                // color={value <= rating ? "yellow.400" : "gray.300"}
                onClick={() => {
                  queryClient.setQueryData<GameBookmark[]>(
                    ["bookmarks"],
                    // @ts-ignore
                    (old) => old.filter((t) => t.rawgId !== bookmark.rawgId)
                  );

                  deleteBookmarkMutation.mutate({
                    userId: userId,
                    game: { rawgId: bookmark.rawgId, name: bookmark.name },
                  });
                }}
                aria-label={``}
              />
            </HStack>
          ))
        ) : (
          <Spinner> </Spinner>
        )}
      </VStack>
    </>
  );
};

export default BookmarkList;
