import { Button, HStack, Text } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  return (
    <HStack justifyContent={"space-between"}>
      <Text fontSize={40} fontWeight={"bold"}>
        GAME WOLRD
      </Text>
      <HStack>
        <Button> LOG IN </Button>
        <Button> SIGN UP </Button>
      </HStack>
    </HStack>
  );
};

export default Header;
