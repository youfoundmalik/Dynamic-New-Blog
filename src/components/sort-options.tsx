import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useDataContext } from "@/context/data-context";
import useSort from "@/hooks/useSort";
import SortIcon from "./icons/sort";

const SortOptions = () => {
  const { filters } = useDataContext();
  const { handleSort } = useSort();

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton as={"button"} className={`w-fit bg-transparent border border-gray-200 rounded hover:bg-gray-50 ${isOpen ? "!bg-gray-100" : ""}`}>
            <span className='flex items-center justify-between min-w-[150px] h-10 px-3'>
              {filters.isRecent ? "Most Recent" : "Relevance"} <SortIcon width={18} height={18} />
            </span>
          </MenuButton>
          <MenuList>
            <MenuItem autoFocus={!filters.isRecent} onClick={() => handleSort("date", false)}>
              Relevance
            </MenuItem>
            <MenuItem autoFocus={filters.isRecent} onClick={() => handleSort("date", true)}>
              Most Recent
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default SortOptions;
