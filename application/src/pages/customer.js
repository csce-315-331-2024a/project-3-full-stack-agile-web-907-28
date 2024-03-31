import Menu from "@/pages/menu"
import UserCredentials from "@/models/UserCredentials";
import RestrictedAccess from "@/components/security/RestrictedAccess";

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
