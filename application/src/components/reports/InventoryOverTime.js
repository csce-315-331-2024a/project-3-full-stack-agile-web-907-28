import React, {useState, useEffect, useContext} from 'react';
import dynamic from 'next/dynamic';
import {Card, CardBody, CardHeader, DateRangePicker, Spinner} from "@nextui-org/react";
import {DateRangeContext} from "@/contexts/DateRangeContext";
import {useApiFetch} from "@/react-hooks/useApiFetch";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * Bar chart showing inventory usage over time
 * @param {*} props 
 * @returns {React.Component}
 */
export default function InventoryOverTime({...props}) {
  const [dateRange, setDateRange] = useContext(DateRangeContext);
  const [fetchUrl, setFetchUrl] = useState("");
  const [series, refreshSeries] = useApiFetch(fetchUrl, {data: []},
    (data) => ({
        data: data.map(item => ({
          x: item.name,
          y: [item.total_amount_used]
        }))
    })
  );

  useEffect(() => {
    const sd = dateRange.start.toDate().toISOString().slice(0, 10);
    const ed = dateRange.end.toDate().toISOString().slice(0, 10);
    setFetchUrl(`/api/inventory_dashboard/getOverTime?startDate=${sd}&endDate=${ed}`);
  }, [dateRange]);

  const options = {
    chart: {
      id: "basic-bar",
    },
    plotOptions: {
      bar: {
        distributed: true, // This will give each bar a different color
        borderRadius: 4 // Rounds the top corners of the bars
      }
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', 
             '#f48024', '#69d2e7'], // Add more colors if you have more data points
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: series.data.map(item => item.x),
      title: {
        text: 'Inventory Items',
        style: {
          color: '#333'
        },
        offsetX: 0,
        offsetY: -10,
      },
      labels: {
        style: {
          colors: '#000',
          fontSize: '14px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Total Amount Used',
        style: {
          color: '#333'
        },
        offsetX: 0,
        offsetY: -10,
      },
      labels: {
        style: {
          colors: '#000', // Darker text color for y-axis values
          fontSize: '14px' // Optional: Adjust font size if needed
        }
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " units"; // Custom formatter for tooltip value
        }
      }
    },
    legend: {
      show: false
    }
  };


  return (
    <Card {...props}>
      <CardHeader className="justify-between">
        <p className="text-xl font-semibold">Inventory Over Time</p>
        <div>
          <DateRangePicker aria-label="Chart date range" className="max-w-xs" value={dateRange} onChange={setDateRange} visibleMonths={3} />
        </div>
      </CardHeader>
      <CardBody>
        {series.data.length === 0 ? (
          <Spinner />
        ) : (
          <Chart options={options} height={window.innerHeight - 210} series={[series]} type="bar" />
        )}
      </CardBody>
    </Card>
  );
}
