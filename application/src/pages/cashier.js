import Menu from "@/pages/menu"
import RestrictedAccess from "@/components/security/RestrictedAccess";
import UserCredentials from "@/models/UserCredentials";

export default function CashierPage() {
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Cashier;
  }
  return (
    <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
      <Menu />
    </RestrictedAccess>
  );
}
