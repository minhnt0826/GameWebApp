import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import GameList from "../components/GameList";
const Home = () => {
  return (
    <>
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
          <GameList></GameList>
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
