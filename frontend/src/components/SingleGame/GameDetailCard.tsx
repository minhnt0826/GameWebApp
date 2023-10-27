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
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import RatingBar from "./RatingBar";
import { useAuthState } from "../../contexts/Authentication";
import NotLoggedInDialog from "../NotLoggedInDialog";

interface Props {
  gameDetail: GameDetail;
}

const GameDetailCard = ({ gameDetail }: Props) => {
  const { isLoggedIn } = useAuthState();

  const useDisclosureReturn = useDisclosure();

  const handleBookmarkGame = () => {
    if (!isLoggedIn) {
      useDisclosureReturn.onOpen();
    }
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
            <Text fontSize={18} pb={2}>
              {`${gameDetail.publishers[0].name}.`} {" Released: "}
              {gameDetail.released}
            </Text>
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
