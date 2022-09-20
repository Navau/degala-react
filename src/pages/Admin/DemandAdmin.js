import React, { useState, useEffect } from "react";
import { Loader, Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DemandCharts } from "../../components/Admin";
import { useDemand } from "../../hooks/useDemand";

export function DemandAdmin(props) {
  const {
    loading,
    error,
    demand,
    predict,
    getDemandPredictByMonth,
    getDemandPredict,
  } = useDemand();
  useEffect(() => {
    getDemandPredict();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      getDemandPredictByMonth(formValue.month);
    },
  });
  return (
    <div>
      <h1>Pronóstico de la demanda</h1>
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <>
          <h2>Pronóstico por mes</h2>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Input
              name="month"
              placeholder="Meses"
              value={formik.values.month}
              onChange={formik.handleChange}
              error={formik.errors.month}
            />
            <Button type="submit" content="Enviar Pronóstico" primary fluid />
          </Form>
          <DemandCharts demand={demand} predict={predict} />
        </>
      )}
    </div>
  );
}

function initialValues() {
  return {
    month: "",
  };
}

function validationSchema() {
  return {
    month: Yup.number().required(true),
  };
}
