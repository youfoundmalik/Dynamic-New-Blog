import { useCallback, useState } from "react";
import { Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react";

import SortIcon from "./icons/sort";
import { useDataContext } from "@/context/data-context";
import { sortNewest, sortRelevance } from "@/utils/constants";
import type { ApiParamsModel } from "@/types";

type SortValue = typeof sortNewest | typeof sortRelevance;

const SortOptions: React.FC = () => {
  const { params, setParams, fetchData: fetchArticles, isLoading: isFetching } = useDataContext();
  const [option, setOption] = useState(params.sort);

  const handleSort = useCallback(
    async (value: string | string[]) => {
      const sortValue = value as SortValue;
      setOption(sortValue);
      const payload: ApiParamsModel = { ...params, sort: sortValue };

      try {
        await fetchArticles(payload);
        setParams(payload);
      } catch (error) {
        setOption(params.sort);
        console.error("Failed to sort articles:", error);
      }
    },
    [fetchArticles, params, setParams]
  );

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            disabled={isFetching}
            as='button'
            aria-label='Sort articles'
            className={`w-fit min-w-[152px] bg-transparent border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed ${
              isOpen ? "!bg-gray-100" : ""
            }`}
            data-state={isOpen ? "open" : "closed"}
          >
            <span className='flex items-center justify-between min-w-[150px] h-10 px-3'>
              {option === sortNewest ? "Most Recent" : "Relevance"}
              <SortIcon width={18} height={18} aria-hidden='true' />
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
