import { useParams } from "@tanstack/react-router";
import React from "react";
import useFetchGameDetail from "../hooks/api/useFetchGameDetail";
import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  HStack,
  VStack,
  Image,
  Text,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import GameDetailCard from "../components/SingleGame/GameDetailCard";
import GameList from "../components/GameList";
import GameDescription from "../components/SingleGame/GameDescription";
import GameInfo from "../components/SingleGame/GameInfo";

const SingleGamePage = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useFetchGameDetail(id);

  return (
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
        minHeight={"100vh"}
      >
        <SideBar />
      </GridItem>
      <GridItem area={"main"} p={10} minHeight={"92vh"}>
        <VStack justify={"start"} align={"start"}>
          {data ? (
            <>
              <GameDetailCard gameDetail={data}></GameDetailCard>

              <Tabs size="md" variant="line">
                <TabList>
                  <Tab>Overview</Tab>
                  <Tab>Reviews</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <VStack align={"start"} spacing={5}>
                      <GameDescription gameDetail={data} />
                      <GameInfo gameDetail={data}></GameInfo>
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          ) : (
            <Spinner> </Spinner>
          )}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default SingleGamePage;
