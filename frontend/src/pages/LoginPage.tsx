import React, { useState } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  VStack,
  Grid,
  GridItem,
  Flex,
  Heading,
  Text,
  Spacer,
  HStack,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import Header from "../layout/Header";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthState } from "../contexts/Authentication";
import { delay } from "framer-motion";

export interface LoginInfo {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [showSucessfulAlert, setShowSuccesfulAlert] = useState(false);

  const { login } = useAuthState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (loginInfo.username.trim() != "" && loginInfo.password.trim() != "")
      await login.mutate(loginInfo, {
        onSuccess: () => {
          setShowSuccesfulAlert(true);
          const timeout = setTimeout(() => {
            navigate({
              to: "/games",
            });
          }, 2000);
        },
        onError: () => {
          setShowAlert(true);
        },
      });
  };

  return (
    <Grid
      templateAreas={`"header"
       "main"`}
      p={10}
    >
      <GridItem area={"header"}>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={35} fontWeight={"bold"} as={Link} to="/">
            GAME WOLRD
          </Text>
          <HStack>
            <Button as={Link} to="/login">
              LOG IN
            </Button>
            <Button as={Link} to="/signup">
              SIGN UP
            </Button>
          </HStack>{" "}
        </HStack>
      </GridItem>
      <GridItem area={"main"}>
        <Flex height="80vh" alignItems="center" justifyContent="center">
          {/* <Box p={8} width={"500px"}> */}
          <VStack width={"500px"} spacing={4} alignItems={"start"}>
            <Heading fontSize={50}> Log in </Heading>
            {showAlert ? (
              <Alert status="error">
                <AlertIcon />
                Wrong login details
              </Alert>
            ) : null}

            {showSucessfulAlert ? (
              <VStack>
                <Alert status="success">
                  <AlertIcon />
                  Logged in successfully! Please wait while we redirect you.
                </Alert>
                <Spinner> </Spinner>{" "}
              </VStack>
            ) : null}

            <FormControl>
              <FormLabel fontSize={22}>Username</FormLabel>
              <Input
                height={"50px"}
                type="text"
                value={loginInfo.username}
                onChange={(e) => {
                  setShowAlert(false);
                  setLoginInfo({ ...loginInfo, username: e.target.value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={22}>Password</FormLabel>
              <Input
                height={"50px"}
                type="password"
                value={loginInfo.password}
                onChange={(e) => {
                  setShowAlert(false);
                  setLoginInfo({ ...loginInfo, password: e.target.value });
                }}
              />
            </FormControl>
            <Button
              colorScheme="twitter"
              width={"100%"}
              height={"70px"}
              onClick={handleSubmit}
            >
              Log in
            </Button>
            <Spacer></Spacer>
            <Spacer></Spacer>
            <Button variant="link" fontSize={22} as={Link} to={"/signup"}>
              Don't have an account? Sign up here.
            </Button>
          </VStack>
          {/* </Box>{" "} */}
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default LoginPage;
