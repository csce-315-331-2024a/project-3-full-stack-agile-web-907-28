import {createContext} from "react";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import MenuItem from "@/models/MenuItem";

const MenuContext = createContext([]);
export default MenuContext;

/**
 * This context provider is for the menu. It uses the nextui-org library for the disclosure.
 * @param {JSX.Element} children - The children of the context provider.
 * @returns {JSX.Element} - The menu context provider.
 */
export function MenuContextProvider({children}) {
  const [menuItems, refreshMenuItems] = useApiFetch("/api/menu/menuitems", [], items => items.map(MenuItem.parseJson));

  return (
    <MenuContext.Provider value={{menuItems, refreshMenuItems}}>
      {children}
    </MenuContext.Provider>
  )
}
