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
import { Table, Button, Icon, Divider } from "semantic-ui-react";
import { map } from "lodash";

import "./PredictDemand.scss";

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

export function PredictDemand(props) {
  const { predict, options } = props;
  const data = {
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
    <div className="predict-demand">
      <div className="predict-demand__charts__line2">
        <Line options={options.optionsline} data={data.dataLine2} />
      </div>
      <Divider />
      <div className="predict-demand__charts__pie">
        <Pie
          width={100}
          height={50}
          options={options.dataPie}
          data={data.dataPie}
        />
      </div>
      <Divider />
      <h1>Pronóstico de Productos</h1>
      <Table className="table-users-admin">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Producto</Table.HeaderCell>
            <Table.HeaderCell>Precio</Table.HeaderCell>
            <Table.HeaderCell>Cantidad</Table.HeaderCell>
            <Table.HeaderCell>Accion</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Camisa</Table.Cell>
            <Table.Cell>110</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Pantalon</Table.Cell>
            <Table.Cell>250</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Polera</Table.Cell>
            <Table.Cell>150</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Chalina</Table.Cell>
            <Table.Cell>45</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Chamarra</Table.Cell>
            <Table.Cell>120</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
