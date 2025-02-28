import { useState } from "react";
import { Button, Checkbox, CheckboxGroup, Menu, MenuButton, MenuList, VStack } from "@chakra-ui/react";

import SettingsIcon from "./icons/settings";
import useFetchArticles from "@/hooks/useNews";
import { useDataContext } from "@/context/data-context";
const SourceOptions = () => {
  const { isFetching, fetchArticles } = useFetchArticles();
  const { availableApis, selectedApis, setSelectedApis } = useDataContext();
  const [selectedSources, setSelectedSources] = useState(selectedApis);

  const handleChange = (values: string[]) => {
    if (values.length === 0) return;
    setSelectedSources(values);
  };

  const handleSave = async (closeMenu: () => void) => {
    await fetchArticles("", selectedSources);
    setSelectedApis(selectedSources);
    closeMenu();
  };

  return (
    <Menu>
      {({ isOpen, onClose }) => (
        <>
          <MenuButton
            as={"button"}
            className={`w-fit bg-transparent border border-gray-200 rounded hover:bg-gray-100 ${isOpen ? "!bg-gray-200" : ""}`}
          >
            <span className='flex items-center justify-center w-10 h-10'>
              <SettingsIcon width={18} height={18} />
            </span>
          </MenuButton>
          <MenuList maxWidth={350} className='!p-4'>
            <h3 className='font-semi-bold text-lg'>Customize your feed</h3>
            <p className='text-gray-500'>All posts are pulled from the following open source APIs.</p>
            <CheckboxGroup colorScheme='orange' value={selectedSources} onChange={handleChange}>
              <VStack spacing={2} align='start' className='my-3'>
                {availableApis.map((item) => (
                  <Checkbox key={item} value={item}>
                    {item}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
            <p className='text-sm text-orange-400'>Minimum of one selection required</p>
            <div className='mt-3 grid grid-cols-2 gap-2'>
              <Button
                colorScheme='blackAlpha'
                variant='outline'
                isDisabled={isFetching}
                className='border !border-gray-200 !rounded py-2 text-gray-500 !font-normal'
                onClick={() => {
                  setSelectedSources(selectedApis);
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                isLoading={isFetching}
                colorScheme='orange'
                className='font-medium !rounded py-2 text-white'
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
