import React, { useState } from "react";
import useFetchGameGuides, {
  GameGuide,
} from "../../hooks/backend/useFetchGameGuides";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

interface GameGuideProps {
  gameGuide: GameGuide;
  handleGuideSelected: (guide: GameGuide) => void;
}

const GameGuideCard = ({ gameGuide, handleGuideSelected }: GameGuideProps) => {
  return (
    <Card
      borderRadius={"10px"}
      width={"40vw"}
      minHeight={"15vh"}
      bgColor={"whiteAlpha.200"}
    >
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading
            fontSize={30}
            as={Link}
            onClick={() => handleGuideSelected(gameGuide)}
          >
            {" "}
            {gameGuide.title}
          </Heading>
        </HStack>
      </CardHeader>
      <CardBody> Written by: {gameGuide.user.username}</CardBody>
    </Card>
  );
};

interface Props {
  gameId: number;
}

interface GuideSelected {
  selected: boolean;
  guide: GameGuide;
}

const GuidesTab = ({ gameId }: Props) => {
  const [guideSelected, setGuideSelected] = useState<GuideSelected>(
    {} as GuideSelected
  );

  const {
    data: gameGuides,
    error,
    isLoading,
    isRefetching,
  } = useFetchGameGuides(gameId);

  const handleGuideSelected = (guide: GameGuide) => {
    setGuideSelected({
      selected: true,
      guide: guide,
    });
  };

  return (
    <>
      {guideSelected.selected ? (
        <VStack align={"start"}>
          <Button
            onClick={() =>
              setGuideSelected({
                selected: false,
              } as GuideSelected)
            }
          >
            Back
          </Button>
          <Heading my={2} fontSize={40}>
            {guideSelected.guide.title}
          </Heading>

          <Text>
            {guideSelected.guide.text.split("\n").map((item) => (
              <>
                <span>
                  {item}
                  <br />
                </span>
              </>
            ))}
          </Text>
        </VStack>
      ) : gameGuides ? (
        <>
          <Heading mb={5}> Game guides</Heading>
          {gameGuides.length <= 0 ? (
            <Text> No game guides written for this game yet.</Text>
          ) : (
            <VStack>
              {gameGuides.map((guide) => (
                <GameGuideCard
                  handleGuideSelected={handleGuideSelected}
                  gameGuide={guide}
                />
              ))}
            </VStack>
          )}
        </>
      ) : (
        <Spinner> </Spinner>
      )}
    </>
  );
};

export default GuidesTab;
