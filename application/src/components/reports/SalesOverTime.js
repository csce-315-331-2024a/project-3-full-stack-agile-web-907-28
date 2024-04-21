import {
  Card, CardBody,
  CardHeader,
  DateRangePicker, Spinner,
} from "@nextui-org/react";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import {useContext, useEffect, useState} from "react";
import dynamic from 'next/dynamic';
import {CalendarDate, fromDate, toCalendarDate} from "@internationalized/date";
import {DateRangeContext} from "@/contexts/DateRangeContext";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


/**
 * Line chart showing sales per menu item and/or category over time.
 * @param props Props passed to Card.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SalesOverTime({...props}) {
  const [dateRange, setDateRange] = useContext(DateRangeContext);
  const [fetchUrl, setFetchUrl] = useState("");
  const [salesTotals, refreshSalesTotals] = useApiFetch(fetchUrl, [],
    (salesTotals) => (
      Object.keys(salesTotals).map(menuItemId => ({
        name: menuItemId,
        data: salesTotals[menuItemId].map(({placed_date, count}) => {
          return {
            x: new Date(placed_date),
            y: parseInt(count)
          }
        })
      }))
    )
  );

  useEffect(() => {
    const sd = dateRange.start.toDate().toISOString().slice(0, 10);
    const ed = dateRange.end.toDate().toISOString().slice(0, 10);
    const timeScale = (dateRange.end.subtract({months: 3}) < dateRange.start) ? "day" : "month";
    setFetchUrl(`/api/reports/getSalesOverTime?startDate=${sd}&endDate=${ed}&timeScale=${timeScale}`);
  }, [dateRange]);

  const chartOptions = {
    chart: {
      type: "line"
    },
    stroke: {
      curve: "smooth"
    },
    xaxis: {
      type: "datetime"
    }
  }

  return (
    <Card {...props}>
      <CardHeader className="justify-between">
        <p className="text-xl font-semibold">Sales Over Time</p>
        <div>
          <DateRangePicker aria-label="Chart date range" className="max-w-xs" value={dateRange} onChange={setDateRange} visibleMonths={3} />
        </div>
      </CardHeader>
      <CardBody>
        {salesTotals === [] ? (
          <Spinner />
        ) : (
          <Chart options={chartOptions} height={window.innerHeight - 210} type="line" series={salesTotals} />
        )}
      </CardBody>
    </Card>
  )
}
