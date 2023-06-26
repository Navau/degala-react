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
  registerables,
} from "chart.js";
import {
  concat,
  filter,
  forEach,
  groupBy,
  isNull,
  isUndefined,
  map,
  size,
  sortBy,
  sumBy,
} from "lodash";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ...registerables
);

export const chartsOptions = (typeData) => {
  return {
    optionsline: {
      fill: false,
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          title: {
            color: "black",
            display: true,
            text: "Fechas",
            color: "#0a0a0a",
            font: {
              weight: "bold",
            },
          },
          grid: {
            color: "#d6bfdb",
          },
          ticks: {
            color: "#0a0a0a",
          },
        },
        y: {
          title: {
            color: "black",
            display: true,
            text:
              typeData === "products"
                ? "Cantidad de Productos"
                : "Cantidad de Ventas en Bs",
            color: "#0a0a0a",
            font: {
              weight: "bold",
            },
          },
          ticks: {
            color: "#0a0a0a",
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              weight: "bold",
            },
          },
        },
        decimation: {
          enabled: true,
          algorithm: "max",
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
};

export function chartsData(demand, dataset) {
  const dates = map(demand, (predict) => predict.date);
  const sales = map(demand, (predict) => predict.sales);
  const quantitys = map(demand, (predict) => predict.quantity);

  const salesDataset = map(dataset, (values) => values.sales);
  const quantityDataset = map(dataset, (values) => values.quantity);
  const datesDataset = map(dataset, (values) => values.date);

  const combinedDatesArray = concat(datesDataset, dates).filter(
    (value, index, self) => self.indexOf(value) === index
  );
  const sortedDatesArray = sortBy(combinedDatesArray);
  const datesFinal = size(dataset) > 0 ? sortedDatesArray : dates;

  const fixSales = sales;
  const fixQuantity = quantitys;
  forEach(dataset, () => {
    fixSales.unshift(NaN);
    fixQuantity.unshift(NaN);
  });
  const salesFinal = size(dataset) > 0 ? fixSales : sales;
  const quantityFinal = size(dataset) > 0 ? fixQuantity : quantitys;

  const salesDatasetChartLine = [
    {
      label: "Pronóstico de ventas",
      data: salesFinal,
      borderColor: "#15002d",
      backgroundColor: "#d6bfdb",
      tension: 0.3,
      pointRadius: 6,
    },
    size(dataset) > 0
      ? {
          label: "Valores Reales",
          data: salesDataset,
          borderColor: "rgb(255, 162, 0)",
          backgroundColor: "rgb(255, 162, 0, 0.5)",
          tension: 0.3,
          pointRadius: 6,
        }
      : null,
  ].filter(Boolean);

  const quantityDatasetChartLine = [
    {
      label: "Pronóstico de cantidad de productos",
      data: quantityFinal,
      borderColor: "#15002d",
      backgroundColor: "#d6bfdb",
      tension: 0.5,
      pointRadius: 6,
    },
    size(dataset) > 0
      ? {
          label: "Valores Reales",
          data: quantityDataset,
          borderColor: "#007BFF",
          backgroundColor: "rgba(0, 123, 255, 0.5)",
          tension: 0.3,
          pointRadius: 6,
        }
      : null,
  ].filter(Boolean);

  const backgroundColorsPie = generateRandomBackgroundColors(size(dates));
  const borderColorsPie = generateRandomBorderColors(size(dates));

  const data = {
    dataLineSales: {
      labels: datesFinal,
      datasets: salesDatasetChartLine,
    },
    dataLineProducts: {
      labels: datesFinal,
      datasets: quantityDatasetChartLine,
    },
    dataPieSales: {
      labels: dates,
      datasets: [
        {
          label: "Cantidad de Ventas",
          data: sales,
          backgroundColor: backgroundColorsPie,
          borderColor: borderColorsPie,
          borderWidth: 1,
        },
      ],
    },
    dataPieQuantity: {
      labels: dates,
      datasets: [
        {
          label: "Cantidad de Productos",
          data: sales,
          backgroundColor: backgroundColorsPie,
          borderColor: borderColorsPie,
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

export const getClassForValue = (value1, value2) => {
  if (value2 > value1) return "-greater"; // Clase CSS para valor mayor
  else if (value2 < value1) return "-lesser"; // Clase CSS para valor menor
  else return ""; // Clase CSS para valor neutral
};

export const moneyFormatter = new Intl.NumberFormat("es-BO", {
  style: "currency",
  currency: "BOB",
});

export const percentageFormatter = new Intl.NumberFormat("es-BO", {
  style: "percent",
  // minimumFractionDigits: 2,
});

export const unitsFormatter = new Intl.NumberFormat("es-BO");

export const generateRandomBackgroundColors = (numColors) => {
  const colors = [];

  for (let i = 0; i < numColors; i++) {
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.2)`;
    colors.push(randomColor);
  }

  return colors;
};

export const generateRandomBorderColors = (numColors) => {
  const colors = [];

  for (let i = 0; i < numColors; i++) {
    // const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    //   Math.random() * 256
    // )}, ${Math.floor(Math.random() * 256)}, 1)`;
    const randomColor = "rgba(10,10,10,1)";
    colors.push(randomColor);
  }

  return colors;
};

export const typeChartOptions = [
  { key: "line", value: "line", text: "Línea" },
  { key: "bar", value: "bar", text: "Barras" },
  { key: "radar", value: "radar", text: "Radar" },
  { key: "doughnut", value: "doughnut", text: "Donut" },
  { key: "pie", value: "pie", text: "Pastel" },
  { key: "polarArea", value: "polarArea", text: "Área Polar" },
];

export const yearDataTransform = (data) => {
  const dataByYear = groupBy(data, (item) => item.date.slice(0, 4));
  return map(dataByYear, (yearData, year) => {
    const totalSales = sumBy(yearData, (yearItem) =>
      parseFloat(yearItem.sales)
    );
    const totalQuantity = sumBy(yearData, (yearItem) =>
      parseFloat(yearItem.quantity)
    );
    return {
      date: year,
      sales: totalSales.toFixed(2),
      quantity: totalQuantity.toFixed(2),
    };
  });
};

export const getCurrentPageData = (data, currentPage, dataPerPage) => {
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  return data?.slice(startIndex, endIndex) || [];
};
