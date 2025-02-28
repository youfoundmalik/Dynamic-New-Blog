import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import FilterIcon from "./icons/filter";
import { useDataContext } from "@/context/data-context";

const FilterOptions: React.FC = () => {
  const { isLoading } = useDataContext();
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
          {/* <DrawerHeader>Create your account</DrawerHeader> */}

          <DrawerBody></DrawerBody>

          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterOptions;

{
  /* <MenuButton as={"button"} className={`w-fit bg-transparent border rounded hover:bg-gray-50 ${isOpen ? "!bg-gray-100" : ""}`}>
            <span className='flex items-center justify-between min-w-[150px] h-10 px-3'>
              {filters.isRecent ? "Most Recent" : "Relevance"} <SortIcon width={18} height={18} />
            </span>
          </MenuButton> */
}
