import { Button, HStack, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import React from "react";

const Header = () => {
  return (
    <HStack justifyContent={"end"} pr={10} pt={10}>
      <HStack>
        <Button as={Link} to="/login">
          LOG IN
        </Button>
        <Button as={Link} to="/signup">
          SIGN UP
        </Button>
      </HStack>
    </HStack>
  );
};

export default Header;
