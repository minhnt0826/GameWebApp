import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useFetchPlatforms, { Platform } from "../../hooks/api/useFetchPlatforms";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { GameSearchParams } from "../../hooks/api/useFetchGames";

interface Props {
  gameSearchParams: GameSearchParams;
}
const PlatformFilterMenu = () => {
  const { data } = useFetchPlatforms();

  const navigate = useNavigate();

  // @ts-ignore
  const { platforms } = useSearch();

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {platforms
            ? data?.results.find((platform) => platform.id == platforms)?.name
            : "Platforms"}
        </MenuButton>
        <MenuList>
          {data?.results.map((platform) => (
            <MenuItem
              onClick={() => {
                navigate({
                  to: "/games",
                  search: (prev) => ({ ...prev, platforms: platform.id }),
                });
              }}
            >
              {platform.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default PlatformFilterMenu;
