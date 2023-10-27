import { Button, HStack, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import React from "react";
import { useAuthState } from "../contexts/Authentication";

const Header = () => {
  const { isLoggedIn } = useAuthState();

  return (
    <HStack justifyContent={"end"} pr={10} pt={10}>
      {isLoggedIn ? (
        <HStack>
          <Button>SIGN OUT</Button>
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
