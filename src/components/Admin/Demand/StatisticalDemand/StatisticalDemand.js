import React from "react";
import { Container, Grid, Icon, Segment, Statistic } from "semantic-ui-react";

import "./StatisticalDemand.scss";
import { filter, size, sumBy } from "lodash";
import { moneyFormatter, unitsFormatter } from "../../../../utils/helpers";

export function StatisticalDemand(props) {
  const { allDemand } = props;
  const calculateAverageSalesPercentage = (year, data) => {
    const filteredData = filter(data, (item) => item.date.includes(year));
    if (size(filteredData) === 0) return "Sin datos";
    const totalSales = sumBy(filteredData, "sales");
    const averageSales = totalSales / filteredData.length;
    return moneyFormatter.format(averageSales);
  };

  const calculateTotalProducts = (year, data) => {
    const filteredData = filter(data, (item) => item.date.includes(year));
    if (size(filteredData) === 0) return "Sin datos";
    const totalProducts = sumBy(filteredData, "quantity");
    const averageProducts = totalProducts / filteredData.length;
    return unitsFormatter.format(averageProducts) + " U. ";
  };

  const items = [
    {
      key: "products",
      label: `Promedio Anual de Productos Vendidos (${new Date().getFullYear()})`,
      value: (
        <Statistic.Value>
          <span>
            {calculateTotalProducts(new Date().getFullYear(), allDemand)}
          </span>
          <Icon name="tags" />
        </Statistic.Value>
      ),
      className: "statistical-demand__products",
    },
    {
      key: "sales",
      label: `Promedio Anual de Ventas en Bolivianos (${new Date().getFullYear()})`,
      value: (
        <Statistic.Value>
          <span>
            {calculateAverageSalesPercentage(
              new Date().getFullYear(),
              allDemand
            )}
          </span>
        </Statistic.Value>
      ),
      className: "statistical-demand__sales",
    },
  ];

  return <Statistic.Group className="statistical-demand" items={items} />;
}
