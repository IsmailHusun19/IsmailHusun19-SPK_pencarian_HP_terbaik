import React from 'react';
import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const chartConfig = {
  type: "bar",
  height: 240,
  series: [{ name: "Persentase", data: [] }],
  options: {
    chart: { toolbar: { show: true } },
    title: { show: false },
    dataLabels: { enabled: true },
    colors: ["#020617"],
    plotOptions: { bar: { columnWidth: "40%", borderRadius: 2 } },
    xaxis: {
      axisTicks: { show: true },
      axisBorder: { show: true },
      labels: {
        style: { colors: "#616161", fontSize: "12px", fontFamily: "inherit", fontWeight: 400 }
      },
      categories: []
    },
    yaxis: {
      labels: {
        style: { colors: "#616161", fontSize: "12px", fontFamily: "inherit", fontWeight: 400 }
      }
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: { lines: { show: true } },
      padding: { top: 5, right: 20 }
    },
    fill: { opacity: 0.8 },
    tooltip: { theme: "dark" }
  }
};

const PersentaseSelection = ({ persentase, name }) => {
  const updatedChartConfig = {
    ...chartConfig,
    series: [{ data: persentase }],
    options: { ...chartConfig.options, xaxis: { ...chartConfig.options.xaxis, categories: name } }
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">Bar Chart</Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart {...updatedChartConfig} />
      </CardBody>
    </Card>
  );
};

export default PersentaseSelection;
