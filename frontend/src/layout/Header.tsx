import { Avatar, Button, HStack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import { useAuthState } from "../contexts/Authentication";

const Header = () => {
  const { isLoggedIn, signout } = useAuthState();

  const navigate = useNavigate();

  return (
    <HStack justifyContent={"end"} pr={10} pt={10}>
      {isLoggedIn ? (
        <HStack>
          <Avatar
            as={Button}
            bg="blue.800"
            mr={2}
            size={"md"}
            p={0}
            onClick={() => navigate({ to: "/profile" })}
          />

          <Button onClick={signout}>SIGN OUT</Button>
        </HStack>
      ) : (
        <HStack>
          <Button as={Link} to="/login">
            LOG IN
          </Button>
          <Button as={Link} to="/signup">
            SIGN UP
          </Button>
        </HStack>
      )}
    </HStack>
  );
};

export default Header;
