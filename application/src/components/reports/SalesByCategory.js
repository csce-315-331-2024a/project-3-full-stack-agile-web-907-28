import {Card, CardBody, CardHeader, Spinner} from "@nextui-org/react";
import menuCategories from "@/models/menuCategories";
import {useContext, useEffect, useState} from "react";
import {DateRangeContext} from "@/contexts/DateRangeContext";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


/**
 * Pie chart showing categories' contributions to total sales.
 * @param props Props passed to Card.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SalesByCategory({...props}) {
  const [dateRange, setDateRange] = useContext(DateRangeContext);
  const [fetchUrl, setFetchUrl] = useState("");
  const [salesByCategory, refreshSalesByCategory] = useApiFetch(fetchUrl, [],
    (salesByCategory) => {
      return menuCategories.map(({id, name}) => {
        return (salesByCategory[id]) ? parseInt(salesByCategory[id].count) : 0;
      });
    }
  );

  useEffect(() => {
    const sd = dateRange.start.toDate().toISOString().slice(0, 10);
    const ed = dateRange.end.toDate().toISOString().slice(0, 10);
    setFetchUrl(`/api/reports/getSalesByCategory?startDate=${sd}&endDate=${ed}`);
  }, [dateRange]);

  const chartOptions = {
    chart: {
      type: "donut"
    },
    labels: menuCategories.map(({name}) => name),
  }

  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">Sales By Category</p>
      </CardHeader>
      <CardBody>
        {salesByCategory.length === 0 ? (
          <Spinner />
        ) : (
          <Chart options={chartOptions} height="90%" type="donut" series={salesByCategory} />
        )}
      </CardBody>
    </Card>
  )
}