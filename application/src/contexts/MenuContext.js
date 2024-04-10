import {createContext} from "react";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import MenuItem from "@/models/MenuItem";

const MenuContext = createContext([]);
export default MenuContext;

export function MenuContextProvider({children}) {
  const [menuItems, refreshMenuItems] = useApiFetch("/api/menu/menuitems", [], items => items.map(MenuItem.parseJson));

  return (
    <MenuContext.Provider value={{menuItems, refreshMenuItems}}>
      {children}
    </MenuContext.Provider>
  )
}
