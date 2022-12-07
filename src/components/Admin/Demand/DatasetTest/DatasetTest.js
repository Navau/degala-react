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
import { Table, Button, Icon } from "semantic-ui-react";

import "./DatasetTest.scss";

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

export function DatasetTest(props) {
  const { demand, options } = props;
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
  };
  return (
    <div className="dataset-test">
      <h2>Pronóstico de prueba (datos de test)</h2>
      <div className="dataset-test__charts">
        <div className="dataset-test__charts__line">
          <Line options={options?.optionsline} data={data?.dataLine} />
        </div>
        {/* <div className="demand-charts__charts__pie">
          <Pie
            width={100}
            height={50}
            options={options.dataPie}
            data={data.dataPie}
          />
        </div> */}
      </div>
    </div>
  );
}
