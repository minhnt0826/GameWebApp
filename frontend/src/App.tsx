import { Grid, GridItem } from "@chakra-ui/react";
import SideBar from "./layout/SideBar.tsx";
import Header from "./layout/Header";
import GameList from "./components/GameList";
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
