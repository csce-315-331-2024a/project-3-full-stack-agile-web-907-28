import { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  Tabs,
  Tab, Card, CardHeader, CardBody
} from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";
import MenuSection from "@/components/menu/MenuSection";
import MenuItem from "@/components/menu/MenuItem";


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
        <Tabs aria-label="menu sections" size="lg" color="primary" items={
          categories.map(category => {
            return {
              id: category.id,
              label: category.name,
              content: (
                <MenuSection
                  key={category.id}
                  menuItems={menuItems}
                  category={category.id}
                  categoryName={category.name}
                />
              )
            }
          })
        }>
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <Card>
                <CardBody>
                  {item.content}
                </CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </center>

    </DefaultLayout>
  );
};
