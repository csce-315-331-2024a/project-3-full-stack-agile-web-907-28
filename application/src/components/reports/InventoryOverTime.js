import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardHeader } from "@nextui-org/react";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

/**
 * Bar chart showing inventory usage over time
 * @param {*} props 
 * @returns {React.Component}
 */
export default function InventoryOverTime({...props}) {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date("2024-01-01").toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date("2024-01-31").toISOString().slice(0, 10));
 const [ screenHeight, setScreenHeight] = useState(window.innerHeight - 80);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/inventory_dashboard/getOverTime?startDate=${startDate}&endDate=${endDate}`);
        const data = await response.json();
        const chartData = data.map(item => ({
          name: item.name,
          data: [item.total_amount_used] // Assuming you only want one data point per item
        }));
        setSeries(chartData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

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
      categories: series.map(item => item.name),
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

  const formattedSeries = [{
    data: series.map(item => ({
      x: item.name,
      y: item.data
    }))
  }];

  const handleStartDateChange = (e) => {
    setStartDate(e);
  }

  const handleEndDateChange = (e) => {
    setEndDate(e);
  }



  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">Inventory Over Time</p>
        <input
              required
              label="Start Date"
              type="date"
              className="w-fit px-1 border-2 border-gray-300 rounded-md"
              value={startDate}
              onChange={e => handleStartDateChange(e.target.value)}
            />
        <input
              required
              label="End Date"
              type="date"
              className="w-fit px-1 border-2 border-gray-300 rounded-md"
              value={endDate}
              onChange={e => handleEndDateChange(e.target.value)}
          />
      </CardHeader>
      {!loading ? (
        <Chart options={options} series={formattedSeries} type="bar" height={screenHeight} />
      ) : (
        <div>Loading...</div>
      )}
    </Card>
  );
}
