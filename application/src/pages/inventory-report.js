import DefaultLayout from "@/layouts/default";
import { Card, CardHeader } from "@nextui-org/react";
import InventoryOverTime from "@/components/reports/InventoryOverTime";
import RestockReport from "@/components/reports/RestockReport";
import ExcessReport from "@/components/reports/ExcessReport";
import RestrictedAccess from "@/components/security/RestrictedAccess";
import UserCredentials from "@/models/UserCredentials";
import {DateRangeProvider} from "@/contexts/DateRangeContext";

/**
 * This function handles the creation of the inventory report page. It uses the DefaultLayout component and the DateRangeContextProvider to provide the date range to the children.
 * @returns {JSX.Element}
 */
export default function InventoryReport() {
  /**
   * This function handles the authorization of the user. It checks if the user is authorized to access the inventory report.
   * @param {UserCredentials} credential - The user's credentials.
   * @returns {boolean} - The authorization status.
   */
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Admin || credential === UserCredentials.Manager;
  }

  return (
    <DefaultLayout>
      <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
        <DateRangeProvider>
          <div className="gap-4 grid grid-cols-12 grid-rows-6 p-3 px-9">
            <InventoryOverTime className="col-span-12 sm:col-span-8 sm:row-span-full"/>
            <RestockReport className="col-span-12 sm:col-span-4 sm:row-span-3 h-[50vh]"/>
            <ExcessReport className="col-span-12 sm:col-span-4 sm:row-span-3 h-[50vh]"/>
          </div>
        </DateRangeProvider>
      </RestrictedAccess>
    </DefaultLayout>
  )
}
