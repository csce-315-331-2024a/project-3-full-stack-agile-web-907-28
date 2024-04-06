import { useState, useEffect } from 'react';
import {
  Tabs,
  Tab, Card, CardBody, useDisclosure
} from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";
import MenuItem from "@/components/menu/MenuItem";
import MenuItemGrid from "@/components/menu/MenuItemGrid";
import OrderPanel from "@/components/orders/OrderPanel";


// Assuming you have a mapping of category IDs to names
// TODO: Move this mapping to the DB
const categories = [
  { id: 0, name: 'Burgers' },
  { id: 1, name: 'Baskets' },
  { id: 2, name: 'Fries' },
  { id: 3, name: 'Sides' },
  { id: 4, name: 'Sandwiches' },
  { id: 6, name: 'Drinks' },
  { id: 7, name: 'Desserts' },
];

/**
 * This function displays the menu page.
 * @returns {JSX.Element} - The menu page.
 */
export default function Menu() {
  // Declare state variables
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartItems, setCartItems] = useState([]);


  // Fetch menu items
  useEffect(() => {
    fetch('/api/menu/menuitems')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched menu items");
        // Set the menu items
        setMenuItems(data);
      });
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setCartItems(currentCartItems => [...currentCartItems, item]);
    onOpen();
  };

  return (
    <DefaultLayout>
      <center>
        <Tabs aria-label="menu sections" size="lg" color="primary">
          {
            categories.map(category => (
              <Tab key={category.id} title={category.name}>
                <Card fullWidth="true" radius="none" shadow="none" >
                  <CardBody>
                    <MenuItemGrid>
                      {
                        menuItems.filter(item => item.categoryId === category.id).map(item => (
                          <div onClick={() => handleItemClick(item)} key={item.menuItemId}>
                            <MenuItem
                              id={item.menuItemId}
                              name={item.name}
                              price={item.price}
                              category={item.categoryId}
                            />
                          </div>
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
      <OrderPanel cart={cartItems} setCart={setCartItems} isOpen={isOpen} onClose={onClose} />
    </DefaultLayout>

  );
};
