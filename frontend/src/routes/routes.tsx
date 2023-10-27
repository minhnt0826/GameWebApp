import { Navigate, RootRoute, Route, Router } from "@tanstack/react-router";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import SignupPage from "../pages/SignupPage";
import SingleGamePage from "../pages/SingleGamePage";
import SinglePublisherPage from "../pages/SinglePublisherPage";
import SingleDeveloperPage from "../pages/SingleDeveloperPage";

const rootRoute = new RootRoute();

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/games" />,
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

export const gamesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/games",
  component: Home,
});

const singleGameRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/games/$id",
  component: SingleGamePage,
});

const singlePublisherRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/publishers/$id",
  component: SinglePublisherPage,
});

const singleDeveloperRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/developers/$id",
  component: SingleDeveloperPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  gamesRoute,
  singleGameRoute,
  singlePublisherRoute,
  singleDeveloperRoute,
]);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const router = new Router({ routeTree });
