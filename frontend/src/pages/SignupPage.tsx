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

  const [showAlert, setShowAlert] = useState(false);
  const [showSucessfulAlert, setShowSuccesfulAlert] = useState(false);

  const { register } = useAuthState();

  const navigate = useNavigate();
  const handleSubmit = async () => {
    // Handle login logic here
    if (
      signupInfo.username.trim() != "" &&
      signupInfo.password.trim() != "" &&
      signupInfo.email.trim() != ""
    ) {
      await register.mutate(signupInfo, {
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
    }
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
            {showAlert ? (
              <Alert status="error">
                <AlertIcon />
                Unable to sign up. Please try again with new information.
              </Alert>
            ) : null}

            {showSucessfulAlert ? (
              <VStack>
                <Alert status="success">
                  <AlertIcon />
                  Signed up successfully! Please wait while we redirect you.
                </Alert>
                <Spinner> </Spinner>{" "}
              </VStack>
            ) : null}
            <FormControl>
              <FormLabel fontSize={22}>Email</FormLabel>
              <Input
                height={"50px"}
                type="text"
                value={signupInfo.email}
                onChange={(e) => {
                  setShowAlert(false);
                  setSignupInfo({ ...signupInfo, email: e.target.value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={22}>Username</FormLabel>
              <Input
                height={"50px"}
                type="text"
                value={signupInfo.username}
                onChange={(e) => {
                  setShowAlert(false);
                  setSignupInfo({ ...signupInfo, username: e.target.value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={22}>Password</FormLabel>
              <Input
                height={"50px"}
                type="password"
                value={signupInfo.password}
                onChange={(e) => {
                  setShowAlert(false);
                  setSignupInfo({ ...signupInfo, password: e.target.value });
                }}
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
