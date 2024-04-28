import {Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import menuCategories from "@/models/menuCategories";
import MenuItemGrid from "@/components/menu/MenuItemGrid";
import MenuItem from "@/components/menu/MenuItem";
import {useContext, useEffect, useState} from "react";
import MenuContext from "@/contexts/MenuContext";
import CartContext from "@/contexts/CartContext";
import ContrastContext from "@/contexts/ContrastContext";

/**
 * This component is the menu view page for the cashier. It uses the nextui-org library for the tabs and cards.
 * @param {function} onItemClick - The function to add an item to the cart.
 * @returns {JSX.Element} - The menu view page.
 */
export default function MenuView({ onItemClick }) {
  const {menuItems} = useContext(MenuContext);
  const {addItemToCart} = useContext(CartContext);
  const {theme} = useContext(ContrastContext);

  //See if theme is changing
  console.log("theme in menu", theme);

  return (
    <center>
      <Tabs aria-label="menu sections" size="lg" color="primary">
        {
          menuCategories.map(category => (
            <Tab key={category.id} title={category.name} className="text-default" textValue={category.name}>
              <Card fullWidth="true" radius="none" shadow="none">
                <CardBody>
                  <MenuItemGrid>
                    {
                      menuItems.filter(item => item.categoryId === category.id).map(item => (
                        <MenuItem
                          key={item.menuItemId}
                          id={item.menuItemId}
                          name={item.name}
                          price={item.price}
                          category={item.categoryId}
                          onClick={() => addItemToCart(item)}
                          isPressable
                          textValue={`${item.name}, $${item.price}`}
                        />
                      ))
                    }
                  </MenuItemGrid>
                </CardBody>
              </Card>
            </Tab>
          ))
        }
      </Tabs>
    </center>
  )
}
