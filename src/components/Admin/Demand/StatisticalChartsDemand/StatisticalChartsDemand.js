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
} from "semantic-ui-react";
import { Chart } from "react-chartjs-2";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { filter, isNull, isUndefined, map } from "lodash";
import * as Yup from "yup";
import {
  chartsData,
  chartsOptions,
  typeChartOptions,
} from "../../../../utils/helpers";

import "./StatisticalChartsDemand.scss";
import { useDataset } from "../../../../hooks";
import dayjs from "dayjs";

export function StatisticalChartsDemand(props) {
  const { demandPredictionInfo, predictType, allDataset } = props;
  const [errorRangeDates, setErrorRangeDates] = useState("");
  const [typeChart, setTypeChart] = useState("line");
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

        await getDatasetByRangeDate(fromDateFinal, toDateFinal);
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
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header>Pronóstico de Ventas</Header>
        </Grid.Column>
      </Grid.Row>
      <Divider />
      <Grid.Row>
        <Grid.Column width={16}>
          <Container className="sales-predict">
            <Chart
              type={typeChart}
              options={chartsOptions("sales").optionsline}
              data={chartsData(demandPredictionInfo, dataset).dataLineSales}
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
              type={typeChart}
              options={chartsOptions("products").optionsline}
              data={chartsData(demandPredictionInfo, dataset).dataLineProducts}
            />
          </Container>
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
          <Grid.Column width={5}>
            <Form.Field required>
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
          <Grid.Column width={4}>
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
          <Grid.Column width={4}>
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
