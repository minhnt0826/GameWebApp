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
import useFetchDeveloperDetail from "../hooks/api/useFetchDeveloperDetail";

const SingleDeveloperPage = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useFetchGames({
    developerId: parseInt(id),
  });

  const { data: developerDetail } = useFetchDeveloperDetail(parseInt(id));

  return (
    <>
      {" "}
      <Grid
        templateAreas={`"sidebar header"
                  "sidebar main"`}
        // pt={10}
        // pr={10}
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
              {/* <HStack mb={5}>
                <PlatformFilterMenu></PlatformFilterMenu>
                <SortMenu></SortMenu>
              </HStack> */}
              <Heading mb={5}>
                Games developed by {developerDetail?.name}{" "}
              </Heading>

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

export default SingleDeveloperPage;
