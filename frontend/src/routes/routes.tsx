import { RootRoute, Route, Router } from "@tanstack/react-router";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import SignupPage from "../pages/SignupPage";
import SingleGamePage from "../pages/SingleGamePage";

const rootRoute = new RootRoute();

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const signupRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignupPage,
});

const singleGameRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/games/$id",
  component: SingleGamePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  singleGameRoute,
]);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const router = new Router({ routeTree });
