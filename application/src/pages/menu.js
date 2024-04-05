import { useState, useEffect } from 'react';
import {
  Tabs,
  Tab, Card, CardBody
} from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";
import MenuItem from "@/components/menu/MenuItem";
import MenuItemGrid from "@/components/menu/MenuItemGrid";


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
                          <MenuItem
                            key={item.menuItemId}
                            id={item.menuItemId}
                            name={item.name}
                            price={item.price}
                            category={item.categoryId}
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
    </DefaultLayout>
  );
};
