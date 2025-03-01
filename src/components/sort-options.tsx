import { useState } from "react";
import { Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react";

import SortIcon from "./icons/sort";
import useFetchArticles from "@/hooks/useNews";
import { useDataContext } from "@/context/data-context";
import { sortNewest, sortRelevance } from "@/utils/constants";

const SortOptions: React.FC = () => {
  const { params, setParams } = useDataContext();
  const [option, setOption] = useState(params.sort);
  const { fetchArticles, isFetching } = useFetchArticles();

  const handleSort = async (value: string | string[]) => {
    setOption(value as typeof sortNewest | typeof sortRelevance);
    const payload = { ...params, sort: value as typeof sortNewest | typeof sortRelevance };
    try {
      await fetchArticles(payload);
      setParams(payload);
    } catch (error) {
      console.log(error);
      setOption(params.sort);
    }
  };

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            disabled={isFetching}
            as={"button"}
            className={`w-fit min-w-[152px] bg-transparent border border-gray-200 rounded hover:bg-gray-50 ${isOpen ? "!bg-gray-100" : ""}`}
          >
            <span className='flex items-center justify-between min-w-[150px] h-10 px-3'>
              {option === sortNewest ? "Most Recent" : "Relevance"} <SortIcon width={18} height={18} />
            </span>
          </MenuButton>
          <MenuList className='shadow'>
            <MenuOptionGroup type='radio' value={params.sort} onChange={handleSort}>
              <MenuItemOption value={sortRelevance}>Relevance</MenuItemOption>
              <MenuItemOption value={sortNewest}>Most Recent</MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default SortOptions;
