import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const SortMenu = () => {
  const sortFields = [
    { key: "", label: "Relevance" },
    { key: "name", label: "Name" },
    { key: "-released", label: "Release Date" },
    { key: "-metacritic", label: "Metacritic Score" },
  ];

  // @ts-ignore
  const { ordering } = useSearch();

  const navigate = useNavigate();

  const selectedSortField = sortFields.find((order) => order.key === ordering);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Sort by: {selectedSortField ? selectedSortField.label : "Relevance"}
      </MenuButton>
      <MenuList>
        {sortFields.map((sortField) => (
          <MenuItem
            onClick={() => {
              navigate({
                to: "/games",
                search: (prev) => ({ ...prev, ordering: sortField.key }),
              });
            }}
          >
            {sortField.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortMenu;
