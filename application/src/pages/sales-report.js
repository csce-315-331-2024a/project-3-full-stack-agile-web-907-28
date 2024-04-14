import DefaultLayout from "@/layouts/default";
import UserCredentials from "@/models/UserCredentials";
import RestrictedAccess from "@/components/security/RestrictedAccess";
import SalesOverTime from "@/components/reports/SalesOverTime";
import SalesByCategory from "@/components/reports/SalesByCategory";
import WhatSellsTogether from "@/components/reports/WhatSellsTogether";

export default function SalesReport() {
  function isCredentialAuthorized(credential) {
    return credential === UserCredentials.Admin || credential === UserCredentials.Manager;
  }

  return (
    <DefaultLayout>
      <RestrictedAccess isCredentialAuthorized={isCredentialAuthorized}>
        <div className="gap-4 grid grid-cols-12 grid-rows-6 p-3 px-9 w-full h-full">
          <SalesOverTime className="col-span-12 sm:col-span-8 sm:row-span-full" />
          <SalesByCategory className="col-span-12 sm:col-span-4 sm:row-span-2" />
          <WhatSellsTogether className="col-span-12 sm:col-span-4 sm:row-span-4" />
        </div>
      </RestrictedAccess>
    </DefaultLayout>
  )
}
