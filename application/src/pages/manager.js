import Menu from "@/pages/menu"
import UserCredentials from "@/models/UserCredentials";
import RestrictedAccess from "@/components/security/RestrictedAccess";

export default function ManagerPage() {
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Manager;
  }
  return (
    <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
      <Menu />
    </RestrictedAccess>
  );
}
