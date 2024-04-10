import DefaultLayout from "@/layouts/default";
import MenuView from "@/components/menu/MenuView";
import {MenuContextProvider} from "@/contexts/MenuContext";


/**
 * This function displays the menu page.
 * @returns {JSX.Element} - The menu page.
 */
export default function Menu() {

  return (
    <DefaultLayout>
      <MenuContextProvider>
        <MenuView />
      </MenuContextProvider>
    </DefaultLayout>
  );
};
