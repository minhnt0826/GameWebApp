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
} from "@chakra-ui/react";
import Header from "../layout/Header";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthState } from "../contexts/Authentication";

type LoginInfo = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    password: "",
  });

  const { isLoggedIn, userId, login } = useAuthState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Handle login logic here
    console.log(loginInfo);
    await login.mutateAsync();

    navigate({
      to: "/games",
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
            <FormControl>
              <FormLabel fontSize={22}>Username</FormLabel>
              <Input
                height={"50px"}
                type="text"
                value={loginInfo.username}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, username: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={22}>Password</FormLabel>
              <Input
                height={"50px"}
                type="password"
                value={loginInfo.password}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
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
