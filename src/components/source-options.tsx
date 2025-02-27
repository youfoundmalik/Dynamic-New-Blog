import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import SettingsIcon from "./icons/settings";

const SourceOptions = () => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton as={"button"} className={`w-fit bg-transparent border border-gray-200 rounded hover:bg-gray-100 ${isOpen ? "!bg-gray-200" : ""}`}>
            <span className='flex items-center justify-center w-10 h-10'>
              <SettingsIcon width={18} height={18} />
            </span>
          </MenuButton>
          <MenuList>
            <MenuItem>NewsAPI</MenuItem>
            <MenuItem>The Guardian</MenuItem>
            <MenuItem>New York Times</MenuItem>
            {/* <MenuOptionGroup title='Country' type='checkbox'>
      <MenuItemOption value='email'>Email</MenuItemOption>
      <MenuItemOption value='phone'>Phone</MenuItemOption>
      <MenuItemOption value='country'>Country</MenuItemOption>
    </MenuOptionGroup> */}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default SourceOptions;
