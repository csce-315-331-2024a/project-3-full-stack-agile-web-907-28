import {createContext, useState} from "react";
import {fromDate, toCalendarDate} from "@internationalized/date";


export const DateRangeContext = createContext([]);

/**
 * This function handles the creation of the DateRangeContextProvider. It provides the date range to the children.
 * @param {*} children - The children of the component.
 * @returns {JSX.Element}
 */
export function DateRangeProvider({ children }) {
  const [dateRange, setDateRange] = useState({
    start: toCalendarDate(fromDate(new Date(), "UTC")).subtract({years: 1}),
    end: toCalendarDate(fromDate(new Date(), "UTC"))
  });

  return (
    <DateRangeContext.Provider value={[dateRange, setDateRange]}>
      {children}
    </DateRangeContext.Provider>
  )
}
