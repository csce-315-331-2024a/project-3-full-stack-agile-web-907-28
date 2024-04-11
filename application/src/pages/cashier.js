import {useEffect, useState} from 'react';
import {Tab, Tabs} from "@nextui-org/react";

import DefaultLayout from "@/layouts/default";
import OrderHistory from "@/components/cashier/OrderHistory"; // Ensure this path matches your file structure
import RestrictedAccess from "@/components/security/RestrictedAccess";
import UserCredentials from "@/models/UserCredentials";
import MenuView from "@/components/menu/MenuView";


/**
 * This function displays the menu page.
 * @returns {JSX.Element} - The menu page.
 */
export default function CashierPage() {
  // Declare state variables
  const [selectedTab, setSelectedTab] = useState('Order History');

  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Cashier || credential === UserCredentials.Admin || credential === UserCredentials.Manager;
  }

  const handleTabChange = (value) => {
    setSelectedTab(value);
    console.log("Selected tab:", value);
  };

  return (
    <DefaultLayout>
      <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
      <center className="pt-5">
        <Tabs aria-label="Cashier" size="lg" color="primary" onSelectionChange={handleTabChange}>
          <Tab key="Ordering" title="Ordering"></Tab>
          <Tab key="Order History" title="Order History"></Tab>
        </Tabs>
      </center>
      <br></br>
        {selectedTab  === "Ordering" ? (
            <MenuView />
          ) : (
            <OrderHistory />
          )
        }
      </RestrictedAccess>
    </DefaultLayout>
  );
};
