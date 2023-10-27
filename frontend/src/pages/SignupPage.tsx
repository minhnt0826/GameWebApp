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
import { Link } from "@tanstack/react-router";

type SignUpInfo = {
  username: string;
  email: string;
  password: string;
};
const SignupPage = () => {
  const [signupInfo, setSignupInfo] = useState<SignUpInfo>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    // Handle login logic here
    console.log(signupInfo);
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
            <Heading fontSize={50}> Sign up </Heading>
            <FormControl>
              <FormLabel fontSize={22}>Email</FormLabel>
              <Input
                height={"50px"}
                type="text"
                value={signupInfo.email}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, email: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={22}>Username</FormLabel>
              <Input
                height={"50px"}
                type="text"
                value={signupInfo.username}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, username: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={22}>Password</FormLabel>
              <Input
                height={"50px"}
                type="password"
                value={signupInfo.password}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, password: e.target.value })
                }
              />
            </FormControl>
            <Button
              colorScheme="twitter"
              width={"100%"}
              height={"70px"}
              onClick={handleSubmit}
            >
              Sign up
            </Button>
            <Spacer></Spacer>
            <Spacer></Spacer>
            <Button variant="link" fontSize={22} as={Link} to={"/login"}>
              Already have an account? Sign in here.
            </Button>
          </VStack>
          {/* </Box>{" "} */}
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default SignupPage;
