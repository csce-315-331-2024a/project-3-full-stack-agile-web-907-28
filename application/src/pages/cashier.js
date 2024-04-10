import { useState, useEffect } from 'react';
import {
  Tabs, Tab, Card, CardBody, useDisclosure
} from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";
import MenuItem from "@/components/menu/MenuItem";
import MenuItemGrid from "@/components/menu/MenuItemGrid";
import OrderPanel from "@/components/orders/OrderPanel";
import OrderHistory from "@/components/cashier/OrderHistory"; // Ensure this path matches your file structure
import RestrictedAccess from "@/components/security/RestrictedAccess";
import UserCredentials from "@/models/UserCredentials";


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
export default function CashierPage() {
  // Declare state variables
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartItems, setCartItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Order History');


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

  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Cashier || credential === UserCredentials.Admin || credential === UserCredentials.Manager;
  }

  const handleTabChange = (value) => {
    setSelectedTab(value);
    console.log("Selected tab:", value);
  };

  return (
    <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
      <DefaultLayout>
      <center className="pt-5">
        <Tabs aria-label="Cashier" size="lg" color="primary" onSelectionChange={handleTabChange}>
          <Tab key="Ordering" title="Ordering"></Tab>
          <Tab key="Order History" title="Order History"></Tab>
        </Tabs>
      </center>
      <br></br>
        {selectedTab  === "Ordering" ? <center>
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
                            onClick={() => handleItemClick(item)}
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
        <OrderPanel cart={cartItems} setCart={setCartItems} isOpen={isOpen} onClose={onClose} />
      </center> 
      : <OrderHistory />
    }
      </DefaultLayout>
</RestrictedAccess>
  );
};
