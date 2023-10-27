import { Grid, GridItem } from "@chakra-ui/react";
import SideBar from "./layout/SideBar.tsx";
import Header from "./layout/Header.tsx";
import GameList from "./components/Home/GameGrid.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/routes.tsx";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
