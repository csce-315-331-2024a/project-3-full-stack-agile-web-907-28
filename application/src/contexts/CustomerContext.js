import {createContext, useEffect, useState} from "react";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import Customer from "@/models/Customer";

const CustomerContext = createContext([]);
export default CustomerContext;

export function CustomerContextProvider({children}) {
    const [customers, refreshCustomers] =  useApiFetch('/api/customer/getCustomers', [], items => items.map(Customer.parseJSON));

    return (
        <CustomerContext.Provider value={{customers, refreshCustomers}}>
            {children}
        </CustomerContext.Provider>
    )
}


