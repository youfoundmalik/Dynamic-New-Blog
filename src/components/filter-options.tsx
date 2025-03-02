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
  const { authors, sources, categories } = data;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        disabled={isLoading}
        onClick={onOpen}
        aria-label='Open filters'
        aria-expanded={isOpen}
        aria-haspopup='dialog'
        className={`flex items-center justify-center w-10 h-10 bg-transparent border border-gray-200 rounded hover:bg-gray-100 ${
          isOpen ? "!bg-gray-200" : ""
        }`}
      >
        <FilterIcon width={18} height={18} aria-hidden='true' />
      </button>
      <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
        <DrawerOverlay />
        <DrawerContent role='dialog' aria-labelledby='filter-heading'>
          <DrawerCloseButton aria-label='Close filters' />
          <DrawerHeader id='filter-heading'>Filter Your Feed</DrawerHeader>

          <DrawerBody className='!pt-0'>
            <p className='text-gray-500 mb-8'>
              This filter only works with the already fetched data(No new API call is made), and is reset after every API call.
            </p>
            <Accordion defaultIndex={[0]} allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton aria-expanded={isOpen}>
                    <Box as='span' flex='1' textAlign='left' fontWeight={500}>
                      Categories
                    </Box>
                    <AccordionIcon aria-hidden='true' />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} pt={0}>
                  <CheckboxGroup colorScheme='cyan' value={filters.categories} onChange={(array) => handleSort("categories", array as string[])}>
                    <VStack spacing={3} align='start' className='my-3'>
                      {categories.map((item) => (
                        <Checkbox key={item} value={item} className='!capitalize !items-baseline'>
                          <span className='block'>{item}</span>
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
                      Authors
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} pt={0}>
                  <CheckboxGroup colorScheme='cyan' value={filters.authors} onChange={(array) => handleSort("authors", array as string[])}>
                    <VStack spacing={3} align='start' className='my-3'>
                      {authors.map((item) => (
                        <Checkbox key={item} value={item} className='!capitalize !items-baseline'>
                          <span className='block'>{item}</span>
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
                  <CheckboxGroup colorScheme='cyan' value={filters.sources} onChange={(array) => handleSort("sources", array as string[])}>
                    <VStack spacing={3} align='start' className='my-3'>
                      {sources.map((item) => (
                        <Checkbox key={item} value={item} className='!capitalize !items-baseline'>
                          <span className='block'>{item}</span>
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
