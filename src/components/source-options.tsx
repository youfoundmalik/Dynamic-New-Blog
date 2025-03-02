import { useState } from "react";
import { Button, Checkbox, CheckboxGroup, Menu, MenuButton, MenuList, VStack } from "@chakra-ui/react";

import SettingsIcon from "./icons/settings";
import useFetchArticles from "@/hooks/useNews";
import { useDataContext } from "@/context/data-context";
const SourceOptions = () => {
  const { isFetching, fetchArticles } = useFetchArticles();
  const { availableApis, selectedApis, setSelectedApis, params } = useDataContext();
  const [selectedSources, setSelectedSources] = useState(selectedApis);

  const handleChange = (values: string[]) => {
    if (values.length === 0) return;
    setSelectedSources(values);
  };

  const handleSave = async (closeMenu: () => void) => {
    await fetchArticles(params, selectedSources);
    setSelectedApis(selectedSources);
    closeMenu();
  };

  return (
    <Menu>
      {({ isOpen, onClose }) => (
        <>
          <MenuButton
            as={"button"}
            disabled={isFetching}
            className={`w-fit bg-transparent border order-2 md:order-3 border-gray-200 rounded hover:bg-gray-100 ${isOpen ? "!bg-gray-200" : ""}`}
          >
            <span className='flex items-center justify-center w-10 h-10'>
              <SettingsIcon width={18} height={18} />
            </span>
          </MenuButton>
          <MenuList maxWidth={350} className='!p-4 shadow-lg'>
            <h3 className='font-semi-bold text-lg'>Customize your feed</h3>
            <p className='text-gray-500'>All posts are pulled from the following open source APIs.</p>
            <CheckboxGroup colorScheme='cyan' value={selectedSources} onChange={handleChange}>
              <VStack spacing={2} align='start' className='my-3'>
                {availableApis.map((item) => (
                  <Checkbox key={item} value={item} isReadOnly={isFetching}>
                    {item}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
            <p className='text-sm text-secondary'>Minimum of one selection required</p>
            <div className='mt-3 grid grid-cols-2 gap-2'>
              <Button
                aria-label='Cancel'
                colorScheme='blackAlpha'
                variant='outline'
                isDisabled={isFetching}
                className='border !border-gray-200 !rounded py-2 text-gray-500 !font-normal'
                onClick={() => {
                  setSelectedSources(selectedApis);
                  onClose();
                }}
              >
                {JSON.stringify(selectedSources.sort()) === JSON.stringify(selectedApis.sort()) ? "Close" : "Cancel"}
              </Button>
              <Button
                aria-label='Save'
                isLoading={isFetching}
                isDisabled={isFetching || JSON.stringify(selectedSources.sort()) === JSON.stringify(selectedApis.sort())}
                colorScheme='cyan'
                className='font-medium !rounded py-2 bg-secondary !text-white'
                onClick={() => handleSave(onClose)}
              >
                Save
              </Button>
            </div>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default SourceOptions;
