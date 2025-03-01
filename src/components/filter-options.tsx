import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import useSort from "@/hooks/useSort";
import FilterIcon from "./icons/filter";
import { useDataContext } from "@/context/data-context";

const FilterOptions: React.FC = () => {
  const { handleSort } = useSort();
  const { isLoading, data, filters } = useDataContext();
  const { authors, sources } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        disabled={isLoading}
        onClick={onOpen}
        className={`flex items-center justify-center w-10 h-10 bg-transparent border border-gray-200 rounded hover:bg-gray-100 ${
          isOpen ? "!bg-gray-200" : ""
        }`}
      >
        <FilterIcon width={18} height={18} />
      </button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Your Feed</DrawerHeader>

          <DrawerBody className='!pt-0'>
            <p className='text-gray-500 mb-8'>
              This filter only works with the already fetched data(No new API call is made), and is reset after every API call.
            </p>
            <Accordion defaultIndex={[0]} allowToggle>
              {/* <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left' fontWeight={500}>
                      Categories
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} pt={0}>
                  <CheckboxGroup colorScheme='cyan' value={filters.categories} onChange={(array) => handleSort("category", array as string[])}>
                    <VStack spacing={2} align='start' className='my-3'>
                      {categories.map((item) => (
                        <Checkbox key={item} value={item}>
                          {item}
                        </Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem> */}
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      Authors
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} pt={0}>
                  <CheckboxGroup colorScheme='cyan' value={filters.authors} onChange={(array) => handleSort("author", array as string[])}>
                    <VStack spacing={2} align='start' className='my-3'>
                      {authors.map((item) => (
                        <Checkbox key={item} value={item}>
                          {item}
                        </Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      Publishers
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} pt={0}>
                  <CheckboxGroup colorScheme='cyan' value={filters.sources} onChange={(array) => handleSort("source", array as string[])}>
                    <VStack spacing={2} align='start' className='my-3'>
                      {sources.map((item) => (
                        <Checkbox key={item} value={item}>
                          {item}
                        </Checkbox>
                      ))}
                    </VStack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterOptions;
