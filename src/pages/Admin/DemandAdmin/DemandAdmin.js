import React, { useState, useEffect, useRef } from "react";
import { Grid, Transition, Divider, Header } from "semantic-ui-react";
import { Element, scroller } from "react-scroll";
import { size } from "lodash";
import {
  DetailsPredictDemand,
  FormPredictDemand,
  StatisticalChartsDemand,
  StatisticalDemand,
} from "../../../components/Admin";
import { useDataset, useDemand } from "../../../hooks";
import { toast } from "react-toastify";

export function DemandAdmin() {
  const [isVisibleAnimation, setIsVisibleAnimation] = useState(false);
  const [demandPredictionInfo, setDemandPredictionInfo] = useState([]);
  const [predictType, setPredictType] = useState("month");
  const { allDemand, getAllDemand } = useDemand();
  const { allDataset, getAllDataset } = useDataset();

  useEffect(() => {
    if (!isVisibleAnimation) setIsVisibleAnimation(true);
  }, []);
  useEffect(() => {
    getAllDemand().catch(() => toast.error("Error al obtener la demanda"));
  }, []);
  useEffect(() => {
    getAllDataset().catch(() =>
      toast.error("Error al obtener las ventas reales")
    );
  }, []);

  const scrollToSection = () => {
    scroller.scrollTo("demand-predict-charts", {
      duration: 1000,
      smooth: true,
    });
  };

  return (
    <div className="demand-admin">
      <Header as="h1">Pronóstico de la demanda</Header>
      <Transition.Group animation="fade up" duration={1000}>
        {isVisibleAnimation && (
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>
                <StatisticalDemand
                  allDemand={allDemand}
                  demandPredictionInfo={demandPredictionInfo}
                />
                <Divider />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <FormPredictDemand
                  setDemandPredictionInfo={setDemandPredictionInfo}
                  scrollToSection={scrollToSection}
                  predictType={predictType}
                  setPredictType={setPredictType}
                />
                <Divider />
              </Grid.Column>
            </Grid.Row>

            <Element name="demand-predict-charts">
              <Transition
                visible={size(demandPredictionInfo) > 0}
                animation="slide down"
                duration={2000}
              >
                <div>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <StatisticalChartsDemand
                        demandPredictionInfo={demandPredictionInfo}
                        predictType={predictType}
                        allDataset={allDataset}
                      />
                      <Divider />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <DetailsPredictDemand
                        demandPredictionInfo={demandPredictionInfo}
                        predictType={predictType}
                        allDataset={allDataset}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </div>
              </Transition>
            </Element>
          </Grid>
        )}
      </Transition.Group>
    </div>
  );
}
