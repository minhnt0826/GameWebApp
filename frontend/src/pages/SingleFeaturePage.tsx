import { useParams } from "@tanstack/react-router";
import React from "react";
import {
  Grid,
  GridItem,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

import useFetchGames from "../hooks/api/useFetchGames";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import GameGrid from "../components/Home/GameGrid";
import useFetchPublisherDetail from "../hooks/api/useFetchPublisherDetail";
import useFetchTagDetail from "../hooks/api/useFetchTagDetail";

const SingleFeaturePage = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useFetchGames({
    tagId: parseInt(id),
  });

  const { data: tagDetail } = useFetchTagDetail(parseInt(id));

  return (
    <>
      {" "}
      <Grid
        templateAreas={`"sidebar header"
                  "sidebar main"`}
      >
        <GridItem area={"header"}>
          <Header />
        </GridItem>
        <GridItem
          area={"sidebar"}
          width={"18vw"}
          bgColor={"#293042"}
          p={5}
          minH={"100vh"}
        >
          <SideBar />
        </GridItem>
        <GridItem area={"main"} p={10}>
          {data ? (
            <>
              <Heading mb={5}>Games with feature: {tagDetail?.name} </Heading>

              <GameGrid gameList={data}></GameGrid>
            </>
          ) : (
            <Spinner> </Spinner>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default SingleFeaturePage;
