import DefaultLayout from "@/layouts/default";
import OrderHistory from "@/components/cashier/OrderHistory"; // Ensure this path matches your file structure
import RestrictedAccess from "@/components/security/RestrictedAccess";
import UserCredentials from "@/models/UserCredentials";


/**
 * The page for viewing and managing order history.
 * @returns {JSX.Element}
 */
export default function OrderHistoryPage() {
  
  /**
   * This function handles the authorization of the user. It checks if the user is authorized to access the order history page.
   * @param {UserCredentials} credential - The user's credentials.
   * @returns {boolean} - The authorization status.
   */
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
