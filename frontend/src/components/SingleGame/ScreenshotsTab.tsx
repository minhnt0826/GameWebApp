import React from "react";
import { GameDetail } from "../../hooks/api/useFetchGameDetail";
import { Img, Spinner, Text } from "@chakra-ui/react";
import useFetchGameScreenshots from "../../hooks/api/useFetchGameScreenshots";

interface Props {
  gameId: number;
}

const ScreenshotsTab = ({ gameId }: Props) => {
  const { data, error, isLoading } = useFetchGameScreenshots(gameId);

  console.log(data);
  return (
    <>
      {data ? (
        data.results.map((screenshot) => {
          <Img src={screenshot.image} />;
        })
      ) : (
        <Spinner> </Spinner>
      )}
    </>
  );
};

export default ScreenshotsTab;
