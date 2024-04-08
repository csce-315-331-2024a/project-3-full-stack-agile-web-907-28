import Menu from "@/pages/menu"
import UserCredentials from "@/models/UserCredentials";
import RestrictedAccess from "@/components/security/RestrictedAccess";
import {useEffect, useState} from "react";
import {Card, CardFooter, CardHeader, Tab, Tabs} from "@nextui-org/react";
import DefaultLayout from "@/layouts/default";
import InventoryManager from "@/components/manager/InventoryManager";
import MenuManager from "@/components/manager/MenuManager";

/**
 * This function displays the manager page.
 * @returns {JSX.Element} - The manager page.
 */
export default function ManagerPage() {
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Manager || credential === UserCredentials.Admin;
  }

  return (
    <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
      <DefaultLayout>
        <MenuManager />
        <InventoryManager />
      </DefaultLayout>
    </RestrictedAccess>
  );
}
