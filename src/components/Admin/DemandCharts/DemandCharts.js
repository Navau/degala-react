import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import "./DemandCharts.scss";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options = {
  optionsline: {
    fill: false,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  },
  optionsPie: {
    fill: false,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  },
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];
const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function DemandCharts(props) {
  const { demand, predict } = props;
  const data = {
    dataLine: {
      labels: demand?.mes,
      datasets: [
        {
          label: "Ventas",
          data: demand?.ventas,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.3,
        },
        {
          label: "Pronóstico",
          data: demand?.pred_value,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.3,
        },
        {
          label: "Valores Reales",
          data: demand?.real_value,
          borderColor: "rgb(255, 162, 0)",
          backgroundColor: "rgb(255, 162, 0, 0.5)",
          tension: 0.3,
        },
      ],
    },
    dataLine2: {
      labels: predict?.mes,
      datasets: [
        {
          label: "Ventas",
          data: predict?.ventas,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.3,
        },
        {
          label: "Pronóstico",
          data: predict?.pred_value,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.3,
        },
      ],
    },
    dataPie: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  };
  return (
    <div className="demand-charts">
      <div className="demand-charts__charts__line2">
        <Line options={options.optionsline} data={data.dataLine2} />
      </div>
      <h2>Pronóstico de prueba (datos de test)</h2>
      <div className="demand-charts__charts">
        <div className="demand-charts__charts__line">
          <Line options={options.optionsline} data={data.dataLine} />
        </div>
        <div className="demand-charts__charts__pie">
          <Pie
            width={100}
            height={50}
            options={options.dataPie}
            data={data.dataPie}
          />
        </div>
      </div>
    </div>
  );
}
