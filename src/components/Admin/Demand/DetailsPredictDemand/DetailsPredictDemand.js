import React from "react";
import {
  Container,
  Divider,
  Grid,
  Header,
  Tab,
  Table,
} from "semantic-ui-react";
import { Chart } from "react-chartjs-2";
import {
  chartsData,
  chartsOptions,
  getClassForValue,
  moneyFormatter,
  percentageFormatter,
  unitsFormatter,
} from "../../../../utils/helpers";

import "./DetailsPredictDemand.scss";
import { map } from "lodash";
import dayjs from "dayjs";

export function DetailsPredictDemand(props) {
  const { demandPredictionInfo, predictType, allDataset } = props;

  const panesDemand = map(demandPredictionInfo, (predict, index) => {
    const previousPredict = demandPredictionInfo?.[index - 1];
    const nextPredict = demandPredictionInfo?.[index + 1];
    const currentDate = predict.date;

    const PARAMS_PREDICT = {
      previousSales: previousPredict?.sales || "-",
      currentSales: predict.sales,
      nextSales: nextPredict?.sales || "-",
      previousQuantity: previousPredict?.quantity || "-",
      currentQuantity: predict.quantity,
      nextQuantity: nextPredict?.quantity || "-",
      previousSalesVariation: "-",
      nextSalesVariation: "-",
      previousQuantityVariation: "-",
      nextQuantityVariation: "-",
      previousSalesSeasonalTrend: "-",
      nextSalesSeasonalTrend: "-",
      previousQuantitySeasonalTrend: "-",
      nextQuantitySeasonalTrend: "-",
      previousDate: dayjs(currentDate + "-01")
        .subtract(1, "month")
        .format("YYYY-MM"),
      currentDate,
      nextDate: dayjs(currentDate + "-01")
        .add(1, "month")
        .format("YYYY-MM"),
    };

    // Cálculo de la variación porcentual
    if (previousPredict) {
      const previousSalesDifference =
        PARAMS_PREDICT.currentSales - PARAMS_PREDICT.previousSales;
      const previousQuantityDifference =
        PARAMS_PREDICT.currentQuantity - PARAMS_PREDICT.previousQuantity;

      const previousSalesVariationPercentage =
        (previousSalesDifference / PARAMS_PREDICT.previousSales) * 100;
      const previousQuantityVariationPercentage =
        (previousQuantityDifference / PARAMS_PREDICT.previousQuantity) * 100;

      PARAMS_PREDICT.previousSalesVariation = `${previousSalesVariationPercentage.toFixed(
        2
      )}%`;
      PARAMS_PREDICT.previousQuantityVariation = `${previousQuantityVariationPercentage.toFixed(
        2
      )}%`;
    }
    if (nextPredict) {
      const nextSalesDifference =
        PARAMS_PREDICT.nextSales - PARAMS_PREDICT.currentSales;
      const nextQuantityDifference =
        PARAMS_PREDICT.nextQuantity - PARAMS_PREDICT.currentQuantity;

      const nextSalesVariationPercentage =
        (nextSalesDifference / PARAMS_PREDICT.currentSales) * 100;
      const nextQuantityVariationPercentage =
        (nextQuantityDifference / PARAMS_PREDICT.currentQuantity) * 100;

      PARAMS_PREDICT.nextSalesVariation = `${nextSalesVariationPercentage.toFixed(
        2
      )}%`;
      PARAMS_PREDICT.nextQuantityVariation = `${nextQuantityVariationPercentage.toFixed(
        2
      )}%`;
    }

    if (previousPredict) {
      if (PARAMS_PREDICT.currentSales > PARAMS_PREDICT.previousSales)
        PARAMS_PREDICT.previousSalesSeasonalTrend = "Aumento";
      else if (PARAMS_PREDICT.currentSales < PARAMS_PREDICT.previousSales)
        PARAMS_PREDICT.previousSalesSeasonalTrend = "Disminución";
      else PARAMS_PREDICT.previousSalesSeasonalTrend = "Sin cambios";

      if (PARAMS_PREDICT.currentQuantity > PARAMS_PREDICT.previousQuantity)
        PARAMS_PREDICT.previousSalesSeasonalTrend = "Aumento";
      else if (PARAMS_PREDICT.currentQuantity < PARAMS_PREDICT.previousQuantity)
        PARAMS_PREDICT.previousSalesSeasonalTrend = "Disminución";
      else PARAMS_PREDICT.previousSalesSeasonalTrend = "Sin cambios";
    }

    if (nextPredict) {
      if (PARAMS_PREDICT.nextSales > PARAMS_PREDICT.currentSales)
        PARAMS_PREDICT.nextSalesSeasonalTrend = "Aumento";
      else if (PARAMS_PREDICT.nextSales < PARAMS_PREDICT.currentSales)
        PARAMS_PREDICT.nextSalesSeasonalTrend = "Disminución";
      else PARAMS_PREDICT.nextSalesSeasonalTrend = "Sin cambios";

      if (PARAMS_PREDICT.nextQuantity > PARAMS_PREDICT.currentQuantity)
        PARAMS_PREDICT.nextQuantitySeasonalTrend = "Aumento";
      else if (PARAMS_PREDICT.nextQuantity < PARAMS_PREDICT.currentQuantity)
        PARAMS_PREDICT.nextQuantitySeasonalTrend = "Disminución";
      else PARAMS_PREDICT.nextQuantitySeasonalTrend = "Sin cambios";
    }

    const classPreviousValue = getClassForValue(
      PARAMS_PREDICT.previousSales,
      PARAMS_PREDICT.currentSales
    );
    const classNextValue = getClassForValue(
      PARAMS_PREDICT.currentSales,
      PARAMS_PREDICT.nextSales
    );

    return {
      menuItem: predict.date,
      render: () => (
        <Tab.Pane>
          <Header as="h3" textAlign="center">
            Detalles para {predict.date}
            <Divider />
          </Header>
          <Grid className="grid-tab-pane-detail-predict">
            <Grid.Row>
              <Grid.Column width={8} className="column-detail-title">
                Ventas totales
              </Grid.Column>
              <Grid.Column width={8} className="column-detail-title">
                Productos vendidos
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8} className="column-detail-description">
                {moneyFormatter.format(PARAMS_PREDICT.currentSales)}
              </Grid.Column>
              <Grid.Column width={8} className="column-detail-description">
                {unitsFormatter.format(PARAMS_PREDICT.currentQuantity)} U.
              </Grid.Column>
            </Grid.Row>
            <Divider className="divider-detail" />
            <Grid.Row>
              <Grid.Column width={16} className="column-detail-main-title">
                DETALLES DE VENTAS
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} className="column-detail-title">
                {PARAMS_PREDICT.previousDate}
              </Grid.Column>
              <Grid.Column width={6} className="column-detail-title">
                {PARAMS_PREDICT.currentDate}
              </Grid.Column>
              <Grid.Column width={5} className="column-detail-title">
                {PARAMS_PREDICT.nextDate}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} className="column-detail-main-title">
                Valores de ventas en relacion al mes anterior y posterior
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                width={5}
                className={`column-detail-description${classPreviousValue}`}
              >
                {PARAMS_PREDICT.previousSales !== "-"
                  ? moneyFormatter.format(PARAMS_PREDICT.previousSales)
                  : PARAMS_PREDICT.previousSales}
              </Grid.Column>
              <Grid.Column width={6} className={`column-detail-description`}>
                {moneyFormatter.format(PARAMS_PREDICT.currentSales)}
              </Grid.Column>
              <Grid.Column
                width={5}
                className={`column-detail-description${classNextValue}`}
              >
                {PARAMS_PREDICT.nextSales !== "-"
                  ? moneyFormatter.format(PARAMS_PREDICT.nextSales)
                  : PARAMS_PREDICT.nextSales}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} className="column-detail-main-title">
                Variación en ventas en relación al mes anterior y posterior
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                width={5}
                className={`column-detail-description${classPreviousValue}`}
              >
                {PARAMS_PREDICT.previousSalesVariation}
              </Grid.Column>
              <Grid.Column width={6} className={`column-detail-description`}>
                {percentageFormatter.format(0)}
              </Grid.Column>
              <Grid.Column
                width={5}
                className={`column-detail-description${classNextValue}`}
              >
                {PARAMS_PREDICT.nextSalesVariation}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} className="column-detail-main-title">
                Tendencia estacional en ventas en relación al mes anterior y
                posterior
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                width={5}
                className={`column-detail-description${classPreviousValue}`}
              >
                {PARAMS_PREDICT.previousSalesSeasonalTrend}
              </Grid.Column>
              <Grid.Column width={6} className={`column-detail-description`}>
                -
              </Grid.Column>
              <Grid.Column
                width={5}
                className={`column-detail-description${classNextValue}`}
              >
                {PARAMS_PREDICT.nextSalesSeasonalTrend}
              </Grid.Column>
            </Grid.Row>
            <Divider className="divider-detail" />
            <Grid.Row>
              <Grid.Column width={16} className="column-detail-main-title">
                DETALLES DE PRODUCTOS
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={5} className="column-detail-title">
                {PARAMS_PREDICT.previousDate}
              </Grid.Column>
              <Grid.Column width={6} className="column-detail-title">
                {PARAMS_PREDICT.currentDate}
              </Grid.Column>
              <Grid.Column width={5} className="column-detail-title">
                {PARAMS_PREDICT.nextDate}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} className="column-detail-main-title">
                Valores de productos vendidos en relacion al mes anterior y
                posterior
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                width={5}
                className={`column-detail-description${classPreviousValue}`}
              >
                {PARAMS_PREDICT.previousQuantity !== "-"
                  ? moneyFormatter.format(PARAMS_PREDICT.previousQuantity)
                  : PARAMS_PREDICT.previousQuantity}
              </Grid.Column>
              <Grid.Column width={6} className={`column-detail-description`}>
                {moneyFormatter.format(PARAMS_PREDICT.currentQuantity)}
              </Grid.Column>
              <Grid.Column
                width={5}
                className={`column-detail-description${classNextValue}`}
              >
                {PARAMS_PREDICT.nextQuantity !== "-"
                  ? moneyFormatter.format(PARAMS_PREDICT.nextQuantity)
                  : PARAMS_PREDICT.nextQuantity}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} className="column-detail-main-title">
                Variación en productos vendidos ventas en relación al mes
                anterior y posterior
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                width={5}
                className={`column-detail-description${classPreviousValue}`}
              >
                {PARAMS_PREDICT.previousQuantityVariation}
              </Grid.Column>
              <Grid.Column width={6} className={`column-detail-description`}>
                {percentageFormatter.format(0)}
              </Grid.Column>
              <Grid.Column
                width={5}
                className={`column-detail-description${classNextValue}`}
              >
                {PARAMS_PREDICT.nextQuantityVariation}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16} className="column-detail-main-title">
                Tendencia estacional en productos vendidos en relación al mes
                anterior y posterior
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column
                width={5}
                className={`column-detail-description${classPreviousValue}`}
              >
                {PARAMS_PREDICT.previousQuantitySeasonalTrend}
              </Grid.Column>
              <Grid.Column width={6} className={`column-detail-description`}>
                -
              </Grid.Column>
              <Grid.Column
                width={5}
                className={`column-detail-description${classNextValue}`}
              >
                {PARAMS_PREDICT.nextQuantitySeasonalTrend}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Tab.Pane>
      ),
    };
  });

  return (
    <Grid className="details-predict-demand">
      <Grid.Row>
        <Grid.Column width={16}>
          <Header>Detalles del Prónostico</Header>
          <Divider />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{
              secondary: true,
              fluid: true,
              vertical: true,
              tabular: true,
            }}
            panes={panesDemand}
          />
          <Divider />
        </Grid.Column>
        <Grid.Column width={16}>
          <Grid.Row>
            <Header>Detalles del Pronóstico Ventas</Header>
            <Divider />
          </Grid.Row>
          <Grid.Row>
            <Container className="sales-quantity">
              <Chart
                type="pie"
                options={chartsOptions().optionsPie}
                data={chartsData(demandPredictionInfo).dataPieSales}
              />
            </Container>
            <Divider />
          </Grid.Row>
          <Grid.Row>
            <Grid.Row>
              <Header>Detalles del Pronóstico Productos</Header>
              <Divider />
            </Grid.Row>
            <Container className="products-quantity">
              <Chart
                type="pie"
                options={chartsOptions().optionsPie}
                data={chartsData(demandPredictionInfo).dataPieQuantity}
              />
            </Container>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
