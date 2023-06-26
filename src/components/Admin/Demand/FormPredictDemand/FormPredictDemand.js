import React, { useState, useEffect } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Label,
} from "semantic-ui-react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { initialValues, validationSchema } from "./FormPredictDemand.validate";
import "./FormPredictDemand.scss";
import {
  monthsOptions,
  yearDataTransform,
  yearsOptions,
} from "../../../../utils/helpers";
import { useDataset, useDemand } from "../../../../hooks";
import { forEach, groupBy, isUndefined, map, size, sumBy } from "lodash";
import dayjs from "dayjs";

export function FormPredictDemand(props) {
  const {
    setDemandPredictionInfo,
    scrollToSection,
    predictType,
    setPredictType,
  } = props;
  const { getDemandPredictByRangeDate, loadingDemand } = useDemand();
  const [errorRangeDates, setErrorRangeDates] = useState("");

  const formik = useFormik({
    initialValues: initialValues(predictType),
    validationSchema: validationSchema(predictType),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        setErrorRangeDates("");
        const fromMonth = formValue?.fromMonth || "01";
        const toMonth = formValue?.toMonth || "01";
        const fromYear = formValue.fromYear;
        const toYear = formValue.toYear;
        const fromDateValidate = dayjs(`${fromYear}-${fromMonth}-01`);
        const toDateValidate = dayjs(`${toYear}-${toMonth}-01`);
        if (fromDateValidate.isAfter(toDateValidate)) {
          setErrorRangeDates(
            "La fecha inicial de pronóstico debe ser menor a la fecha final de pronóstico"
          );
          return;
        }
        const fromDate = !isUndefined(formValue?.fromMonth)
          ? `${formValue.fromYear}-${formValue.fromMonth}`
          : `${formValue.fromYear}-01`;
        const toDate = !isUndefined(formValue?.toMonth)
          ? `${formValue.toYear}-${formValue.toMonth}`
          : `${formValue.toYear}-01`;

        const predictDemand = await getDemandPredictByRangeDate(
          fromDate,
          toDate
        );
        let predictDemandFinal =
          predictType === "month"
            ? predictDemand
            : yearDataTransform(predictDemand);

        setDemandPredictionInfo(predictDemandFinal);
        scrollToSection();
      } catch (err) {
        toast.error(
          err?.message || err?.detail || "Error al obtener la demanda"
        );
      }
    },
  });

  return (
    <>
      <Header>Formulario de Pronóstico</Header>
      <Container className="container-predict-demand">
        <Form className="form-predict-demand" onSubmit={formik.handleSubmit}>
          <Grid className="form-predict-demand__grid-inputs">
            <Grid.Row>
              <Grid.Column width={6}>
                <Form.Field required>
                  <label>Tipo de Pronóstico</label>
                  <Dropdown
                    placeholder="Tipo de Pronóstico"
                    fluid
                    selection
                    search
                    options={[
                      { key: 0, text: "Pronóstico Mensual", value: "month" },
                      { key: 1, text: "Pronóstico Anual", value: "year" },
                    ]}
                    value={formik.values.predictType}
                    onChange={(_, data) => {
                      formik.setFieldValue("predictType", data.value);
                      setPredictType((prev) => {
                        if (prev === "month") return "year";
                        if (prev === "year") return "month";
                      });
                    }}
                    error={!isUndefined(formik.errors.predictType)}
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column width={10}>
                <Grid className="range-dates">
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Header as="h4" textAlign="center">
                        Selección de rango de fechas
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    {predictType === "month" ? (
                      <>
                        <Grid.Column width={8}>
                          <MonthsFieldsFrom formik={formik} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <MonthsFieldsTo formik={formik} />
                        </Grid.Column>
                      </>
                    ) : (
                      <>
                        <Grid.Column width={8}>
                          <YearsFieldsFrom formik={formik} />
                        </Grid.Column>
                        <Grid.Column width={8}>
                          <YearsFieldsTo formik={formik} />
                        </Grid.Column>
                      </>
                    )}
                  </Grid.Row>
                  {errorRangeDates && (
                    <Grid.Row>
                      <Grid.Column width={16}>
                        <Label className="label-error-admin">
                          {errorRangeDates}
                        </Label>
                      </Grid.Column>
                    </Grid.Row>
                  )}
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Form.Button
            type="submit"
            primary
            fluid
            content="Pronosticar"
            loading={loadingDemand}
          />
        </Form>
      </Container>
    </>
  );
}

function MonthsFieldsFrom(props) {
  const { formik } = props;
  return (
    <Form.Field required>
      <label>De: </label>
      <Dropdown
        className="months-options"
        placeholder="Mes"
        fluid
        selection
        scrolling
        search
        options={monthsOptions()}
        value={formik.values.fromMonth}
        onChange={(_, data) => formik.setFieldValue("fromMonth", data.value)}
        error={!isUndefined(formik.errors.fromMonth)}
      />
      {formik.errors.fromMonth && (
        <Label pointing prompt>
          {formik.errors.fromMonth}
        </Label>
      )}
      <Divider />
      <Dropdown
        className="years-options"
        placeholder="Año"
        fluid
        scrolling
        selection
        search
        options={yearsOptions()}
        value={formik.values.fromYear}
        onChange={(_, data) => formik.setFieldValue("fromYear", data.value)}
        error={!isUndefined(formik.errors.fromYear)}
      />
      {formik.errors.fromYear && (
        <Label pointing prompt>
          {formik.errors.fromYear}
        </Label>
      )}
    </Form.Field>
  );
}

function MonthsFieldsTo(props) {
  const { formik } = props;
  return (
    <Form.Field required>
      <label>A: </label>
      <Dropdown
        className="months-options"
        placeholder="Mes"
        fluid
        selection
        scrolling
        search
        options={monthsOptions()}
        value={formik.values.toMonth}
        onChange={(_, data) => formik.setFieldValue("toMonth", data.value)}
        error={!isUndefined(formik.errors.toMonth)}
      />
      {formik.errors.toMonth && (
        <Label pointing prompt>
          {formik.errors.toMonth}
        </Label>
      )}
      <Divider />
      <Dropdown
        className="years-options"
        placeholder="Año"
        fluid
        scrolling
        selection
        search
        options={yearsOptions()}
        value={formik.values.toYear}
        onChange={(_, data) => formik.setFieldValue("toYear", data.value)}
        error={!isUndefined(formik.errors.toYear)}
      />
      {formik.errors.toYear && (
        <Label pointing prompt>
          {formik.errors.toYear}
        </Label>
      )}
    </Form.Field>
  );
}

function YearsFieldsFrom(props) {
  const { formik } = props;
  return (
    <Form.Field required>
      <label>De: </label>
      <Dropdown
        className="years-options"
        placeholder="Año"
        fluid
        selection
        scrolling
        search
        options={yearsOptions()}
        value={formik.values.fromYear}
        onChange={(_, data) => formik.setFieldValue("fromYear", data.value)}
        error={!isUndefined(formik.errors.fromYear)}
      />
      {formik.errors.fromYear && (
        <Label pointing prompt>
          {formik.errors.fromYear}
        </Label>
      )}
    </Form.Field>
  );
}

function YearsFieldsTo(props) {
  const { formik } = props;
  return (
    <Form.Field required>
      <label>A: </label>
      <Dropdown
        className="years-options"
        placeholder="Año"
        fluid
        selection
        scrolling
        search
        options={yearsOptions()}
        value={formik.values.toYear}
        onChange={(_, data) => formik.setFieldValue("toYear", data.value)}
        error={!isUndefined(formik.errors.toYear)}
      />
      {formik.errors.toYear && (
        <Label pointing prompt>
          {formik.errors.toYear}
        </Label>
      )}
    </Form.Field>
  );
}
