import React from "react";
import { GameDetail } from "../../hooks/api/useFetchGameDetail";
import {
  AspectRatio,
  Badge,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import RatingBar from "./RatingBar";
import { useAuthState } from "../../contexts/Authentication";
import NotLoggedInDialog from "../NotLoggedInDialog";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  gameDetail: GameDetail;
}

const GameDetailCard = ({ gameDetail }: Props) => {
  const { isLoggedIn } = useAuthState();

  const useDisclosureReturn = useDisclosure();

  const navigate = useNavigate();

  const handleBookmarkGame = () => {
    if (!isLoggedIn) {
      useDisclosureReturn.onOpen();
    }
  };

  const handleClickPublisher = () => {
    navigate({
      to: "/publishers/$id",
      params: { id: gameDetail.publishers[0].id.toString() },
    });
  };

  return (
    <Card borderRadius={"25px"} width={"76vw"} bgColor={"whiteAlpha.200"}>
      <CardBody>
        <HStack alignItems={"flex-start"}>
          <AspectRatio ratio={1} width={"22%"} mr={6}>
            <Image borderRadius={"12px"} src={gameDetail.background_image} />
          </AspectRatio>
          <VStack alignItems={"start"}>
            <Heading fontSize={50}> {gameDetail.name}</Heading>
            <HStack pb={2}>
              <Text as={Link} onClick={handleClickPublisher} fontSize={18}>
                {`${gameDetail.publishers[0].name}.`}
              </Text>
              <Text fontSize={18}>
                {" Released: "}
                {gameDetail.released}
              </Text>
            </HStack>

            <RatingBar gameDetail={gameDetail} />
            <Button colorScheme="teal" mt={2} onClick={handleBookmarkGame}>
              Bookmark this game{" "}
            </Button>
            <NotLoggedInDialog
              action={"bookmark games"}
              useDisclosureReturn={useDisclosureReturn}
            />
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GameDetailCard;
