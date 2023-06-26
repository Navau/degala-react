import React, { useState } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Form,
  Button,
  Label,
  Segment,
  Checkbox,
} from "semantic-ui-react";
import { Chart } from "react-chartjs-2";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { filter, groupBy, isNull, isUndefined, map, sumBy } from "lodash";
import * as Yup from "yup";
import {
  chartsData,
  chartsOptions,
  typeChartOptions,
  yearDataTransform,
} from "../../../../utils/helpers";

import "./StatisticalChartsDemand.scss";
import { useDataset } from "../../../../hooks";
import dayjs from "dayjs";

export function StatisticalChartsDemand(props) {
  const { demandPredictionInfo, predictType, allDataset } = props;
  const [errorRangeDates, setErrorRangeDates] = useState("");
  const [typeChart, setTypeChart] = useState("line");
  const [largeCharts, setLargeCharts] = useState(false);
  const { getDatasetByRangeDate, dataset, setDataset, loadingDataset } =
    useDataset();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        setErrorRangeDates("");
        const fromDate =
          predictType === "month"
            ? formValue.fromDate + "-01"
            : formValue.fromDate + "-01-01";
        const toDate =
          predictType === "month"
            ? formValue.toDate + "-01"
            : formValue.toDate + "-01-01";
        const fromDateValidate = dayjs(fromDate);
        const toDateValidate = dayjs(toDate);
        if (fromDateValidate.isAfter(toDateValidate)) {
          setErrorRangeDates(
            "La fecha inicial de valores reales debe ser menor a la fecha final de valores reales"
          );
          return;
        }
        const fromDateFinal =
          predictType === "month"
            ? `${formValue.fromDate}`
            : `${formValue.fromDate}-01`;
        const toDateFinal =
          predictType === "month"
            ? `${formValue.toDate}`
            : `${formValue.toDate}-01`;

        const response = await getDatasetByRangeDate(
          fromDateFinal,
          toDateFinal
        );
        let responseFinal =
          predictType === "month" ? response : yearDataTransform(response);

        setDataset(responseFinal);
      } catch (err) {
        toast.error(err?.message || "Error del servidor");
      }
    },
  });
  const onCancelForm = () => setDataset([]);
  return (
    <Grid className="statistical-charts-demand">
      <Grid.Row>
        <Grid.Column width={16}>
          <FormSelectExtraOptions
            predictType={predictType}
            allDataset={allDataset}
            loadingDataset={loadingDataset}
            errorRangeDates={errorRangeDates}
            formik={formik}
            onCancelForm={onCancelForm}
            typeChart={typeChart}
            setTypeChart={setTypeChart}
            largeCharts={largeCharts}
            setLargeCharts={setLargeCharts}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={largeCharts ? 16 : 8}>
          <Grid.Row>
            <Header>Pronóstico de Ventas</Header>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Container className="sales-predict">
              <Chart
                type={typeChart}
                options={chartsOptions("sales").optionsline}
                data={chartsData(demandPredictionInfo, dataset).dataLineSales}
              />
            </Container>
            {largeCharts && <Divider />}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={largeCharts ? 16 : 8}>
          <Grid.Row>
            <Header>Pronóstico de Productos</Header>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Container className="products-predict">
              <Chart
                type={typeChart}
                options={chartsOptions("products").optionsline}
                data={
                  chartsData(demandPredictionInfo, dataset).dataLineProducts
                }
              />
            </Container>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function FormSelectExtraOptions(props) {
  const {
    predictType,
    allDataset,
    formik,
    onCancelForm,
    errorRangeDates,
    loadingDataset,
    typeChart,
    setTypeChart,
    largeCharts,
    setLargeCharts,
  } = props;

  const optionsByLastDateDataset = (predictTypeParam) => {
    if (predictTypeParam === "month")
      return map(allDataset, (data, index) => {
        return { key: index, text: data.date, value: data.date };
      });
    else {
      let previousYear = allDataset?.[0]?.date?.split("-")?.[0] || "";
      return filter(
        map(allDataset, (data, index) => {
          const year = data.date?.split("-")?.[0] || "";
          if (year !== previousYear) {
            previousYear = year;
            return { key: index, text: year, value: year };
          }
          return null;
        }),
        (option) => !isNull(option)
      );
    }
  };

  return (
    <Form className="form-select-extra-options" onSubmit={formik.handleSubmit}>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h3">Selección extra de información</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3}>
            <Form.Field>
              <label>Tipo de gráfico:</label>
              <Dropdown
                placeholder="Tipo de gráfico"
                fluid
                selection
                search
                options={typeChartOptions}
                value={typeChart}
                onChange={(_, data) => setTypeChart(data.value)}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={3}>
            <Form.Field>
              <label>Tamaño del grafico:</label>
              <Checkbox
                toggle
                label={largeCharts ? "Cambiar a Pequeño" : "Cambiar a Grande"}
                checked={largeCharts}
                onChange={() => setLargeCharts((prev) => !prev)}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={1}>
            <Divider vertical />
          </Grid.Column>
          <Grid.Column width={3}>
            <Form.Field required>
              <label>Ventas reales desde:</label>
              <Dropdown
                placeholder="Ventas reales desde:"
                fluid
                selection
                search
                options={optionsByLastDateDataset(predictType)}
                value={formik.values.fromDate}
                onChange={(_, data) =>
                  formik.setFieldValue("fromDate", data.value)
                }
                error={!isUndefined(formik.errors.fromDate)}
              />
              {formik.errors.fromDate && (
                <Label pointing prompt>
                  {formik.errors.fromDate}
                </Label>
              )}
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={3}>
            <Form.Field required>
              <label>hasta:</label>
              <Dropdown
                placeholder="hasta:"
                fluid
                selection
                search
                options={optionsByLastDateDataset(predictType)}
                value={formik.values.toDate}
                onChange={(_, data) =>
                  formik.setFieldValue("toDate", data.value)
                }
                error={!isUndefined(formik.errors.toDate)}
              />
              {formik.errors.toDate && (
                <Label pointing prompt>
                  {formik.errors.toDate}
                </Label>
              )}
              {errorRangeDates && (
                <Label className="label-error-admin">{errorRangeDates}</Label>
              )}
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={3} className="form-select-extra-options__actions">
            <Button type="submit" primary loading={loadingDataset}>
              Cargar ventas reales
            </Button>
            <Button type="button" negative onClick={onCancelForm}>
              Limpiar ventas reales
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
}

function initialValues() {
  return {
    fromDate: undefined,
    toDate: undefined,
  };
}

function validationSchema() {
  return Yup.object().shape({
    fromDate: Yup.string(
      "La fecha inicial de datos reales debe ser un texto"
    ).required("El fecha inicial de datos reales es obligatorio"),
    toDate: Yup.string(
      "La fecha final de datos reales debe ser un texto"
    ).required("El fecha final de datos reales es obligatorio"),
  });
}
