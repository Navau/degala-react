import React from "react";
import { Container, Divider, Grid, Header } from "semantic-ui-react";
import { Chart } from "react-chartjs-2";
import { chartsData, chartsOptions } from "../../../../utils/helpers";

import "./StatisticalChartsDemand.scss";

export function StatisticalChartsDemand(props) {
  const {} = props;
  return (
    <Grid className="statistical-charts-demand">
      <Grid.Row>
        <Grid.Column width={16}>
          <Header>Pronóstico de Ventas</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Container className="sales-predict">
            <Chart
              type="line"
              options={chartsOptions.optionsline}
              data={chartsData({}).dataSales}
            />
          </Container>
        </Grid.Column>
      </Grid.Row>
      <Divider />
      <Grid.Row>
        <Grid.Column width={16}>
          <Header>Pronóstico de Productos</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Container className="products-predict">
            <Chart
              type="line"
              options={chartsOptions.optionsline}
              data={chartsData({}).dataProducts}
            />
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
