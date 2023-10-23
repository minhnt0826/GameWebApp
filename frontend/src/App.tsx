import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./layout/NavBar";
import Header from "./layout/Header";
import GameList from "./components/GameList";

function App() {
  return (
    <>
      <Grid
        templateAreas={`"header header"
                "nav main"`}
        p={5}
      >
        <GridItem area={"header"}>
          <Header />
        </GridItem>
        <GridItem area={"nav"}>
          <NavBar />
        </GridItem>
        <GridItem area={"main"}>
          <GameList></GameList>
        </GridItem>
      </Grid>
      ;
    </>
  );
}

export default App;
