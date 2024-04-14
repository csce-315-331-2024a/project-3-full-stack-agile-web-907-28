import UserCredentials from "@/models/UserCredentials";
import DefaultLayout from "@/layouts/default";
import RestrictedAccess from "@/components/security/RestrictedAccess";
import {InventoryContextProvider} from "@/contexts/InventoryContext";
import InventoryManager from "@/components/manager/InventoryManager";


/**
 * The webpage for inventory management - viewing, creation, editing, and deletion of inventory items.
 * @returns {JSX.Element}
 * @constructor
 */
export default function InventoryManagement() {
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Manager || credential === UserCredentials.Admin;
  }

  return (
    <DefaultLayout>
      <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
        <InventoryContextProvider>
          <InventoryManager />
        </InventoryContextProvider>
      </RestrictedAccess>
    </DefaultLayout>
  )
}
