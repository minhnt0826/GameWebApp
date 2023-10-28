import React, { useEffect, useState } from "react";
import { useAuthState } from "../contexts/Authentication";
import {
  Grid,
  GridItem,
  Heading,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import useFetchUserProfile, {
  UserProfile,
} from "../hooks/backend/useFetchUserProfile";
import useMutateUserProfile from "../hooks/backend/useMutateUserProfile";

const UserProfilePage = () => {
  const { isLoggedIn, userId } = useAuthState();

  if (!(isLoggedIn && userId)) {
    return (
      <>
        <Text> Unauthorised. You have to login first </Text>
      </>
    );
  }

  const { data, error, isLoading } = useFetchUserProfile(userId);

  const [profile, setProfile] = useState<UserProfile>(
    data
      ? {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          username: data.username,
          password: data.password,
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
        }
  );

  useEffect(() => {
    setProfile(
      data
        ? {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            username: data.username,
            password: data.password,
          }
        : {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
          }
    );
  }, [data]);

  const userProfileMutation = useMutateUserProfile(userId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Submit logic here
    userProfileMutation.mutate(profile);
  };

  return (
    <>
      <Grid
        templateAreas={`"sidebar header"
                  "sidebar main"`}
        // pt={10}
        // pr={10}
      >
        <GridItem area={"header"}>
          <Header />
        </GridItem>
        <GridItem
          area={"sidebar"}
          width={"18vw"}
          bgColor={"#293042"}
          p={5}
          minH={"100vh"}
        >
          <SideBar />
        </GridItem>
        <GridItem area={"main"} pl={10} width={"78vw"} minHeight={"100vh"}>
          <Box>
            <Heading alignSelf={"start"} fontSize={45} mb={5}>
              {" "}
              Your profile
            </Heading>
            {data ? (
              <VStack spacing={4} maxW={"20vw"} minWidth={"250px"}>
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="username"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <Button colorScheme="twitter" onClick={handleSubmit}>
                  Update Profile
                </Button>
                {userProfileMutation.isLoading ? <Spinner> </Spinner> : null}
              </VStack>
            ) : (
              <Spinner> </Spinner>
            )}
          </Box>
          {/* <VStack justifyItems={"flex-start"}></VStack> */}
        </GridItem>
      </Grid>
    </>
  );
};

export default UserProfilePage;
