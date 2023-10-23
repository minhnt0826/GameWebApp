import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
  Badge,
  Spacer,
  Button,
  Heading,
  Link,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { Game } from "../hooks/api/useFetchGames";

type GameProps = {
  game: Game;
};

const GameCard = ({ game }: GameProps) => {
  console.log(typeof game.released);
  return (
    <Card borderRadius={10}>
      <Image src={game.background_image} borderRadius={10} />

      <CardBody p={3}>
        <HStack justifyContent="space-between">
          <Heading as={Link} fontSize={25} fontWeight={"bold"}>
            {game.name}
          </Heading>

          <Text fontSize={25} fontWeight={"bold"}>
            {game.released.slice(0, 4)}{" "}
          </Text>
        </HStack>

        <Badge
          fontSize={20}
          colorScheme={
            game.metacritic > 80
              ? "green"
              : game.metacritic > 60
              ? "yellow"
              : "red"
          }
        >
          {game.metacritic}
        </Badge>
      </CardBody>
    </Card>
  );
};

export default GameCard;
