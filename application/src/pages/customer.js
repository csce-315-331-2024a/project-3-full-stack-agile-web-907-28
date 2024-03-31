import Menu from "@/pages/menu"
import UserCredentials from "@/models/UserCredentials";
import RestrictedAccess from "@/components/security/RestrictedAccess";

/**
 * This function displays the customer page. It allows users to view the menu.
 * @returns {JSX.Element} - The customer page.
 */
export default function CustomerPage() {
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Customer;
  }
  return (
    <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
      <Menu />
    </RestrictedAccess>
  );
}
