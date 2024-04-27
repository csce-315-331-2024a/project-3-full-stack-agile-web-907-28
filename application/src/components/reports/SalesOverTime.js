import {
  Card, CardBody,
  CardHeader,
  DateRangePicker, Spinner, Tab, Tabs,
} from "@nextui-org/react";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import {useContext, useEffect, useState} from "react";
import dynamic from 'next/dynamic';
import {CalendarDate, fromDate, toCalendarDate} from "@internationalized/date";
import {DateRangeContext} from "@/contexts/DateRangeContext";
import MenuContext from "@/contexts/MenuContext";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


/**
 * Line chart showing sales per menu item and/or category over time.
 * @param props Props passed to Card.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SalesOverTime({...props}) {
  const {menuItems} = useContext(MenuContext);
  const [dateRange, setDateRange] = useContext(DateRangeContext);
  const [fetchUrl, setFetchUrl] = useState("");
  const [fetchResult, refreshFetchResult] = useApiFetch(fetchUrl, []);
  const [salesTotals, setSalesTotals] = useState([]);
  const [showRevenue, setShowRevenue] = useState(false);
  const [revenueTotals, setRevenueTotals] = useState([]);

  useEffect(() => {
    const sd = dateRange.start.toDate().toISOString().slice(0, 10);
    const ed = dateRange.end.toDate().toISOString().slice(0, 10);
    const timeScale = (dateRange.end.subtract({months: 3}) < dateRange.start) ? "day" : "month";
    setFetchUrl(`/api/reports/getSalesOverTime?startDate=${sd}&endDate=${ed}&timeScale=${timeScale}`);
  }, [dateRange]);

  useEffect(() => {
    setSalesTotals(
      Object.keys(fetchResult).map(menuItemId => ({
        name: menuItemId,
        data: fetchResult[menuItemId].map(({placed_date, count}) => {
          return {
            x: new Date(placed_date),
            y: parseInt(count)
          }
        })
      }))
    );
  }, [fetchResult]);

  useEffect(() => {
    setRevenueTotals(
      Object.keys(fetchResult).map(menuItemId => ({
        name: menuItemId,
        data: fetchResult[menuItemId].map(({placed_date, count}) => {
          return {
            x: new Date(placed_date),
            y: parseInt(count) * menuItems.find(item => item.menuItemId === parseFloat(menuItemId)).price
          }
        })
      }))
    );
  }, [fetchResult, menuItems]);

  const salesChartOptions = {
    chart: {
      type: "line"
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      type: "datetime"
    },
  };
  const revenueChartOptions = {
    chart: {
      type: "line"
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      labels: {
        formatter: val => `$${val.toFixed(2)}`
      }
    }
  };

  return (
    <Card {...props}>
      <CardHeader className="justify-between">
        <p className="text-xl font-semibold">Sales Over Time</p>
        <Tabs color="primary" selectedKey={showRevenue ? "revenue" : "quantity"} onSelectionChange={key => setShowRevenue(key === "revenue")}>
          <Tab key="quantity" title="Quantity" />
          <Tab key="revenue" title="Revenue" />
        </Tabs>
        <DateRangePicker aria-label="Chart date range" className="max-w-xs" value={dateRange} onChange={setDateRange} visibleMonths={3} />
      </CardHeader>
      <CardBody>
        {salesTotals.length === 0 ? (
          <Spinner />
        ) : (
          <Chart options={showRevenue ? revenueChartOptions : salesChartOptions} height={window.innerHeight - 210} type="line" series={showRevenue ? revenueTotals : salesTotals} />
        )}
      </CardBody>
    </Card>
  )
}
