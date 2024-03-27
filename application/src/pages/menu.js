import { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  Tabs,
  Tab
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

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);


  useEffect(() => {
    // Fetch menu items
    fetch('/api/menu/menuitems')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched menu items");
        setMenuItems(data);
      });
  }, []);

  return (
    <DefaultLayout>
      <Navbar>
        <NavbarContent justify="center">
          {
            categories.map(category => (
              <NavbarItem key={category.id}>
                <Button
                  as={Link}
                  href={`#${category.name}`}
                  variant="light"
                >
                  {category.name}
                </Button>
              </NavbarItem>
            ))
          }
        </NavbarContent>
      </Navbar>

      {
        categories.map(category=> (
          <MenuSection
            key={category.id}
            menuItems={menuItems}
            category={category.id}
            categoryName={category.name}
          />
        ))
      }
    </DefaultLayout>
  );
};
