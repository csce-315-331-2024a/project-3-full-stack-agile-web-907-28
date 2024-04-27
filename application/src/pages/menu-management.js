import UserCredentials from "@/models/UserCredentials";
import DefaultLayout from "@/layouts/default";
import RestrictedAccess from "@/components/security/RestrictedAccess";
import {MenuContextProvider} from "@/contexts/MenuContext";
import MenuManager from "@/components/manager/MenuManager";
import {InventoryContextProvider} from "@/contexts/InventoryContext";


/**
 * The webpage for menu management - viewing, creation, editing, and deletion of menu items.
 * @returns {JSX.Element}
 * @constructor
 */
export default function MenuManagement() {
  
  /**
   * This function handles the authorization of the user. It checks if the user is authorized to access the menu management page.
   * @param {UserCredentials} credential - The user's credentials.
   * @returns {boolean} - The authorization status.
   */
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Manager || credential === UserCredentials.Admin;
  }

  return (
    <DefaultLayout>
      <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
        <MenuContextProvider>
          <InventoryContextProvider>
            <MenuManager />
          </InventoryContextProvider>
        </MenuContextProvider>
      </RestrictedAccess>
    </DefaultLayout>
  )
}
