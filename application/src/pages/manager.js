import Menu from "@/pages/menu"
import UserCredentials from "@/models/UserCredentials";
import RestrictedAccess from "@/components/security/RestrictedAccess";

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
      <Menu />
    </RestrictedAccess>
  );
}
