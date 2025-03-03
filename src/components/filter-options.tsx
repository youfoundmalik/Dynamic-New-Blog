import { memo } from "react";
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

type FilterGroupProps = {
  title: string;
  items: string[];
  value: string[];
  onChange: (values: string[]) => void;
};

const FilterGroup = memo(({ title, items, value, onChange }: FilterGroupProps) => (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as='span' flex='1' textAlign='left' fontWeight={500}>
          {title}
        </Box>
        <AccordionIcon aria-hidden='true' />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} pt={0}>
      <CheckboxGroup colorScheme='cyan' value={value} onChange={(array) => onChange(array as string[])}>
        <VStack spacing={3} align='start' className='my-3'>
          {items.map((item) => (
            <Checkbox key={item} value={item} className='!capitalize !items-baseline'>
              <span className='block'>{item}</span>
            </Checkbox>
          ))}
        </VStack>
      </CheckboxGroup>
    </AccordionPanel>
  </AccordionItem>
));

FilterGroup.displayName = "FilterGroup";

const FilterButton = memo(({ isOpen, isLoading, onClick }: { isOpen: boolean; isLoading: boolean; onClick: () => void }) => (
  <button
    disabled={isLoading}
    onClick={onClick}
    aria-label='Open filters'
    aria-expanded={isOpen}
    aria-haspopup='dialog'
    className={`flex items-center justify-center !w-10 !h-10 bg-transparent !border !border-gray-200 rounded ${
      isOpen ? "!bg-gray-200" : "hover:!bg-gray-100"
    }`}
  >
    <FilterIcon width={18} height={18} aria-hidden='true' />
  </button>
));

FilterButton.displayName = "FilterButton";

const FilterOptions: React.FC = () => {
  const { handleSort } = useSort();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data, filters } = useDataContext();
  const { authors, sources, categories } = data;

  return (
    <>
      <FilterButton isOpen={isOpen} isLoading={isLoading} onClick={onOpen} />
      <Drawer isOpen={isOpen} onClose={onClose} placement='right' autoFocus={false}>
        <DrawerOverlay />
        <DrawerContent aria-labelledby='filter-heading'>
          <DrawerCloseButton aria-label='Close filters' />
          <DrawerHeader id='filter-heading'>Filter Your Feed</DrawerHeader>

          <DrawerBody className='!pt-0'>
            <p className='text-gray-500 !mb-8'>
              This filter only works with the already fetched data (no new API call is made), and is reset after every API call.
            </p>
            <Accordion defaultIndex={[0]} allowToggle>
              <FilterGroup title='Categories' items={categories} value={filters.categories} onChange={(array) => handleSort("categories", array)} />
              <FilterGroup title='Authors' items={authors} value={filters.authors} onChange={(array) => handleSort("authors", array)} />
              <FilterGroup title='Publishers' items={sources} value={filters.sources} onChange={(array) => handleSort("sources", array)} />
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default memo(FilterOptions);
