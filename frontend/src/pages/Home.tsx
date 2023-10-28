import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import PlatformFilterMenu from "../components/Home/PlatformFilterMenu";
import useFetchGames, {
  GameList,
  GameSearchParams,
} from "../hooks/api/useFetchGames";
import GameGrid from "../components/Home/GameGrid";
import { useSearch } from "@tanstack/react-router";
import SortMenu from "../components/Home/SortMenu";

const Home = () => {
  // @ts-ignore
  const { genres, platforms, ordering } = useSearch({ from: "/games" });

  const [gameSearchParams, setGameSearchParams] = useState<GameSearchParams>(
    {} as GameSearchParams
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    setGameSearchParams({
      genreId: genres,
      platformId: platforms,
      ordering: ordering,
      page: page,
    });
  }, [genres, platforms, ordering, page]);

  const { data, error, isLoading } = useFetchGames(gameSearchParams);

  return (
    <>
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
              <HStack mb={5}>
                <PlatformFilterMenu></PlatformFilterMenu>
                <SortMenu></SortMenu>
              </HStack>
              <GameGrid gameList={data}></GameGrid>
              <Box display="flex" justifyContent="center" mt={4}>
                <HStack>
                  <Button
                    onClick={() => {
                      setPage(page - 1);
                    }}
                    disabled={page === 1}
                  >
                    Prev
                  </Button>
                  <Text fontSize={20} mx={2}>
                    Page: {page}
                  </Text>
                  <Button
                    onClick={() => {
                      setPage(page + 1);
                    }}
                    disabled={page === 5}
                  >
                    Next
                  </Button>
                </HStack>
              </Box>
            </>
          ) : (
            <Spinner> </Spinner>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
