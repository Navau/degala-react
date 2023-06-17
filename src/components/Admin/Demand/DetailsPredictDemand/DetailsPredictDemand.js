import React from "react";
import { Container, Divider, Grid, Header, Tab } from "semantic-ui-react";
import { Chart } from "react-chartjs-2";
import { chartsData, chartsOptions } from "../../../../utils/helpers";

import "./DetailsPredictDemand.scss";

export function DetailsPredictDemand(props) {
  const {} = props;

  const panesDemand = [
    { menuItem: "2022-01", render: () => <Tab.Pane>2022-01</Tab.Pane> },
    { menuItem: "2022-02", render: () => <Tab.Pane>2022-02</Tab.Pane> },
    { menuItem: "2022-03", render: () => <Tab.Pane>2022-03</Tab.Pane> },
    { menuItem: "2022-04", render: () => <Tab.Pane>2022-04</Tab.Pane> },
    { menuItem: "2022-05", render: () => <Tab.Pane>2022-05</Tab.Pane> },
    { menuItem: "2022-06", render: () => <Tab.Pane>2022-06</Tab.Pane> },
    { menuItem: "2022-07", render: () => <Tab.Pane>2022-07</Tab.Pane> },
    { menuItem: "2022-08", render: () => <Tab.Pane>2022-08</Tab.Pane> },
    { menuItem: "2022-09", render: () => <Tab.Pane>2022-09</Tab.Pane> },
    { menuItem: "2022-10", render: () => <Tab.Pane>2022-10</Tab.Pane> },
    { menuItem: "2022-11", render: () => <Tab.Pane>2022-11</Tab.Pane> },
    { menuItem: "2022-12", render: () => <Tab.Pane>2022-12</Tab.Pane> },
  ];

  return (
    <Grid className="details-predict-demand">
      <Grid.Row>
        <Grid.Column width={16}>
          <Header>Detalles del Prónostico</Header>
          <Divider />
        </Grid.Column>
        <Grid.Column width={8}>
          <Tab
            menu={{
              secondary: true,
              fluid: true,
              vertical: true,
              tabular: true,
            }}
            panes={panesDemand}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Grid.Row>
            <Container className="sales-quantity">
              <Chart
                type="pie"
                options={chartsOptions.optionsPie}
                data={chartsData({}).dataPie}
              />
            </Container>
            <Divider />
          </Grid.Row>
          <Grid.Row>
            <Container className="products-quantity">
              <Chart
                type="pie"
                options={chartsOptions.optionsPie}
                data={chartsData({}).dataPie}
              />
            </Container>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
