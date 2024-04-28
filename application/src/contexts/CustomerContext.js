import {createContext, useEffect, useState} from "react";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import Customer from "@/models/Customer";

const CustomerContext = createContext([]);
export default CustomerContext;

/**
 * This function handles the creation of the CustomerContextProvider. It fetches the customers from the /api/customer/getCustomers endpoint and provides them to the children.
 * @param {*} children - The children of the component.
 * @returns {JSX.Element}
 */
export function CustomerContextProvider({children}) {
    const [customers, refreshCustomers] =  useApiFetch('/api/customer/getCustomers', [], items => items.map(Customer.parseJSON));

    return (
        <CustomerContext.Provider value={{customers, refreshCustomers}}>
            {children}
        </CustomerContext.Provider>
    )
}


