import { Navigate, RootRoute, Route, Router } from "@tanstack/react-router";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import SignupPage from "../pages/SignupPage";
import SingleGamePage from "../pages/SingleGamePage";
import SinglePublisherPage from "../pages/SinglePublisherPage";
import SingleDeveloperPage from "../pages/SingleDeveloperPage";
import UserProfilePage from "../pages/UserProfilePage";
import ManageGuidesPage from "../pages/ManageGuidesPage";
import NewGuidePage from "../pages/NewGuidePage";
import SingleFeaturePage from "../pages/SingleFeaturePage";

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

const singleFeatureRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/features/$id",
  component: SingleFeaturePage,
});

const userProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: UserProfilePage,
});

const manageGuidesPage = new Route({
  getParentRoute: () => rootRoute,
  path: "/guides",
  component: ManageGuidesPage,
});

const newGuidePage = new Route({
  getParentRoute: () => rootRoute,
  path: "/games/$id/new-guide",
  component: NewGuidePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  gamesRoute,
  singleGameRoute,
  singlePublisherRoute,
  singleDeveloperRoute,
  singleFeatureRoute,
  userProfileRoute,
  manageGuidesPage,
  newGuidePage,
]);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const router = new Router({ routeTree });
