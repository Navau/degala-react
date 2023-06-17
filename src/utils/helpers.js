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
import { filter, isNull, isUndefined } from "lodash";

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

export const chartsOptions = {
  optionsline: {
    fill: false,
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  },
  optionsPie: {
    fill: false,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
    },
  },
};

export const labels = [
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

export function chartsData(props) {
  const { products, sales } = props;
  const data = {
    dataSales: {
      labels: sales?.month,
      datasets: [
        {
          label: "Ventas",
          data: sales?.sales,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.3,
        },
        {
          label: "Pronóstico",
          data: sales?.pred_value,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          tension: 0.3,
        },
        {
          label: "Valores Reales",
          data: sales?.real_value,
          borderColor: "rgb(255, 162, 0)",
          backgroundColor: "rgb(255, 162, 0, 0.5)",
          tension: 0.3,
        },
      ],
    },
    dataProducts: {
      labels: products?.month,
      datasets: [
        {
          label: "Ventas",
          data: products?.products,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          tension: 0.3,
        },
        {
          label: "Pronóstico",
          data: products?.pred_value,
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
          label: "Cantidad de Productos",
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
  return data;
}

export const monthsOptions = (startDate = undefined) => {
  const monthNames = [
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

  const startMonth = isUndefined(startDate)
    ? 0
    : new Date(startDate).getMonth();
  const month = startMonth;
  const monthsFinal = Array.from({ length: 12 }, (_, index) => {
    if (index >= month) {
      const monthNumber = index + 1;
      const monthValue =
        monthNumber < 10 ? `0${monthNumber}` : monthNumber.toString();
      const monthName = monthNames[index];
      return { key: monthNumber, text: monthName, value: monthValue };
    }
    return null;
  });
  return filter(monthsFinal, (month) => !isNull(month));
};

export const yearsOptions = (startDate = new Date()) => {
  const startYear = new Date(startDate).getFullYear();
  return Array.from({ length: 10 }, (_, index) => {
    const year = startYear + index;
    return { key: year, text: year.toString(), value: year.toString() };
  });
};
