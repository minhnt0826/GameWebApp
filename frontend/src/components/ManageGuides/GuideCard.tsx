import React from "react";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GameGuide } from "../../hooks/backend/useFetchGameGuides";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteGameGuide } from "../../hooks/backend/useMutateGameGuide";

interface Props {
  gameGuide: GameGuide;
  handleDeleteGameGuide: (guideId: number) => void;
}
const GuideCard = ({ gameGuide, handleDeleteGameGuide }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      borderRadius={"10px"}
      width={"40vw"}
      minHeight={"15vh"}
      bgColor={"whiteAlpha.200"}
    >
      <CardHeader mb={-3}>
        <VStack justifyContent={"space-between"} align={"start"} spacing={3}>
          <Heading> {gameGuide.title}</Heading>
          <Text
            as={Link}
            onClick={() =>
              navigate({
                to: "/games/$id",
                params: { id: gameGuide.game.rawgId.toString() },
              })
            }
            fontSize={22}
          >
            {gameGuide.game.name}{" "}
          </Text>
        </VStack>
      </CardHeader>
      <CardBody>
        <Button
          colorScheme="red"
          onClick={() => handleDeleteGameGuide(gameGuide.id)}
        >
          Delete this game guide
        </Button>
      </CardBody>
    </Card>
  );
};

export default GuideCard;
