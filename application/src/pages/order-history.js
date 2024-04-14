import DefaultLayout from "@/layouts/default";
import OrderHistory from "@/components/cashier/OrderHistory"; // Ensure this path matches your file structure
import RestrictedAccess from "@/components/security/RestrictedAccess";
import UserCredentials from "@/models/UserCredentials";


/**
 * The page for viewing and managing order history.
 * @returns {JSX.Element}
 */
export default function OrderHistoryPage() {
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Cashier || credential === UserCredentials.Admin || credential === UserCredentials.Manager;
  }

  return (
    <DefaultLayout>
      <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
        <OrderHistory />
      </RestrictedAccess>
    </DefaultLayout>
  );
};
