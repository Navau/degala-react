import React, { useState, useEffect } from "react";
import { Grid, Transition, Divider, Header } from "semantic-ui-react";
import {
  DetailsPredictDemand,
  FormPredictDemand,
  StatisticalChartsDemand,
  StatisticalDemand,
} from "../../../components/Admin";

export function DemandAdmin() {
  const [isVisibleAnimation, setIsVisibleAnimation] = useState(false);
  useEffect(() => {
    if (!isVisibleAnimation) setIsVisibleAnimation(true);
  }, []);

  return (
    <div className="demand-admin">
      <Header as="h1">Pronóstico de la demanda</Header>
      <Transition.Group animation="fade up" duration={1000}>
        {isVisibleAnimation && (
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <StatisticalDemand />
                <Divider />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <FormPredictDemand />
                <Divider />
              </Grid.Column>
              <Grid.Column width={16}>
                <StatisticalChartsDemand />
                <Divider />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <DetailsPredictDemand />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Transition.Group>
    </div>
  );
}
