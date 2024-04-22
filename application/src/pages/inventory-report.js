import DefaultLayout from "@/layouts/default";
import { Card, CardHeader } from "@nextui-org/react";
import InventoryOverTime from "@/components/reports/InventoryOverTime";
import RestockReport from "@/components/reports/RestockReport";
import ExcessReport from "@/components/reports/ExcessReport";
import RestrictedAccess from "@/components/security/RestrictedAccess";
import UserCredentials from "@/models/UserCredentials";

export default function InventoryReport() {
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Admin || credential === UserCredentials.Manager;
  }

  return (
    <DefaultLayout>
      <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
        <div className="gap-4 grid grid-cols-12 grid-rows-6 p-3 px-9">
          <InventoryOverTime className="col-span-12 sm:col-span-8 sm:row-span-full"/>
          <RestockReport className="col-span-12 sm:col-span-4 sm:row-span-3 h-[50vh]" />
          <ExcessReport className="col-span-12 sm:col-span-4 sm:row-span-3 h-[50vh]" />
        </div>
      </RestrictedAccess>
    </DefaultLayout>
  )
}
