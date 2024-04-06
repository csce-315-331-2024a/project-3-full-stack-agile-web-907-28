import Menu from "@/pages/menu"
import RestrictedAccess from "@/components/security/RestrictedAccess";
import UserCredentials from "@/models/UserCredentials";

/**
 * This function displays the cashier page.
 * @returns {JSX.Element} - The cashier page.
 */
export default function CashierPage() {
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Cashier || credential === UserCredentials.Admin || credential === UserCredentials.Manager;
  }
  return (
    <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
      <Menu />
    </RestrictedAccess>
  );
}
