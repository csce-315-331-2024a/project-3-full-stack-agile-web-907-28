import UserCredentials from "@/models/UserCredentials";
import DefaultLayout from "@/layouts/default";
import RestrictedAccess from "@/components/security/RestrictedAccess";
import {MenuContextProvider} from "@/contexts/MenuContext";
import MenuManager from "@/components/manager/MenuManager";


/**
 * The webpage for menu management - viewing, creation, editing, and deletion of menu items.
 * @returns {JSX.Element}
 * @constructor
 */
export default function MenuManagement() {
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Manager || credential === UserCredentials.Admin;
  }

  return (
    <DefaultLayout>
      <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
        <MenuContextProvider>
          <MenuManager />
        </MenuContextProvider>
      </RestrictedAccess>
    </DefaultLayout>
  )
}
