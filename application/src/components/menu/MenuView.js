import {Card, CardBody, Tab, Tabs} from "@nextui-org/react";
import menuCategories from "@/models/menuCategories";
import MenuItemGrid from "@/components/menu/MenuItemGrid";
import MenuItem from "@/components/menu/MenuItem";
import {useContext, useEffect, useState} from "react";
import MenuContext from "@/contexts/MenuContext";
import CartContext from "@/contexts/CartContext";

export default function MenuView({ onItemClick }) {
  const {menuItems} = useContext(MenuContext);
  const {addItemToCart} = useContext(CartContext);

  return (
    <center>
      <Tabs aria-label="menu sections" size="lg" color="primary">
        {
          menuCategories.map(category => (
            <Tab key={category.id} title={category.name}>
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
