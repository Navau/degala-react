import React from "react";
import { Container, Grid, Icon, Segment, Statistic } from "semantic-ui-react";

import "./StatisticalDemand.scss";

export function StatisticalDemand(props) {
  const {} = props;
  const items = [
    {
      key: "products",
      label: "Cantidad Total de Productos",
      value: (
        <Statistic.Value>
          2500 <Icon name="tags" />
        </Statistic.Value>
      ),
      className: "statistical-demand__products",
    },
    {
      key: "sales",
      label: "Promedio de Ventas",
      value: (
        <Statistic.Value>
          4600 <span>Bs</span>
        </Statistic.Value>
      ),
      className: "statistical-demand__sales",
    },
  ];

  return <Statistic.Group className="statistical-demand" items={items} />;
}
