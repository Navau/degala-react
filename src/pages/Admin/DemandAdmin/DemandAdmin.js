// import React, { useState, useEffect } from "react";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";
// import { Line, Pie } from "react-chartjs-2";
// import { Loader, Button, Form, Divider } from "semantic-ui-react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { DemandCharts, DatasetTest } from "../../../components/Admin";
// import { useDemand } from "../../../hooks";
// import { REGEX_PATTERNS } from "../../../utils/constants";
// import { PredictDemand } from "../../../components/Admin/Demand/PredictDemand/PredictDemand";

// export function DemandAdmin(props) {
//   const {
//     loading,
//     loadingPredict,
//     error,
//     demand,
//     predict,
//     getDemandPredictByMonth,
//     getDemandPredict,
//   } = useDemand();
//   useEffect(() => {
//     getDemandPredict();
//   }, []);

//   const formik = useFormik({
//     initialValues: initialValues(),
//     validationSchema: Yup.object(validationSchema()),
//     onSubmit: async (formValue) => {
//       await getDemandPredictByMonth(formValue.month);
//     },
//   });

//   const options = {
//     optionsline: {
//       fill: false,
//       responsive: true,
//       maintainAspectRatio: true,
//       plugins: {
//         legend: {
//           position: "top",
//         },
//         title: {
//           display: true,
//           text: "Chart.js Line Chart",
//         },
//       },
//     },
//     optionsPie: {
//       fill: false,
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           position: "top",
//         },
//         title: {
//           display: true,
//           text: "Chart.js Line Chart",
//         },
//       },
//     },
//   };

//   return (
//     <div className="demand-admin">
//       <h1>Pronóstico de la demanda</h1>
//       <h2>Pronóstico por mes</h2>
//       <Form onSubmit={formik.handleSubmit} className="demand-admin__form">
//         <Form.Input
//           name="month"
//           placeholder="Meses"
//           value={formik.values.month}
//           onChange={formik.handleChange}
//           error={formik.errors.month}
//         />
//         <Button
//           type="submit"
//           content="Enviar Meses para pronóstico"
//           primary
//           fluid
//         />
//       </Form>
//       <Divider />
//       {loading ? (
//         <Loader active inline="centered">
//           Cargando...
//         </Loader>
//       ) : (
//         // <DatasetTest demand={demand} options={options} />
//         <DemandCharts demand={demand} predict={predict} />
//       )}
//       <Divider />
//       {/* {loadingPredict ? (
//         <Loader active inline="centered">
//           Cargando...
//         </Loader>
//       ) : (
//         <PredictDemand predict={predict} options={options} />
//       )} */}
//     </div>
//   );
// }

// function initialValues() {
//   return {
//     month: "",
//   };
// }

// function validationSchema() {
//   return {
//     month: Yup.number()
//       .typeError("El mes no es un número válido")
//       .test(
//         "Es decimal",
//         "El mes no cumple con el formato correcto de número entero, ejemplo: '99'",
//         (val, options) => {
//           if (val !== undefined) {
//             return REGEX_PATTERNS.month.test(options.originalValue);
//           }
//           return true;
//         }
//       )
//       .required("El mes es obligatorio"),
//   };
// }
import React, { useState, useEffect } from "react";
import { Loader, Button, Form } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DemandCharts } from "../../..//components/Admin";
import { useDemand } from "../../../hooks";

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
      <h2>Pronóstico por mes</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="month"
          placeholder="Meses"
          value={formik.values.month}
          onChange={formik.handleChange}
          error={formik.errors.month}
        />
        <Button
          type="submit"
          content="Enviar Pronóstico"
          primary
          fluid
          loading={formik.isSubmitting}
        />
      </Form>
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <>
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
