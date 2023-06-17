import * as Yup from "yup";

export function initialValues(predictTypeInputs) {
  if (predictTypeInputs === "month")
    return {
      predictType: "month",
      fromMonth: undefined,
      fromYear: undefined,
      toMonth: undefined,
      toYear: undefined,
    };
  else
    return {
      predictType: "year",
      fromYear: undefined,
      toYear: undefined,
    };
}

export function validationSchema(predictTypeInputs) {
  if (predictTypeInputs === "month")
    return Yup.object().shape({
      predictType: Yup.string(
        "El tipo de pronóstico debe ser un texto"
      ).required("El tipo de pronóstico es obligatorio"),
      fromMonth: Yup.string(
        "El mes inicial de prónostico debe ser un texto"
      ).required("El mes inicialde prónostico es obligatorio"),
      fromYear: Yup.string(
        "El año inicial de prónostico debe ser un texto"
      ).required("El año inicial de prónostico es obligatorio"),
      toMonth: Yup.string(
        "El mes final de prónostico debe ser un texto"
      ).required("El mes final de prónostico es obligatorio"),
      toYear: Yup.string(
        "El año final de prónostico debe ser un texto"
      ).required("El año final de prónostico es obligatorio"),
    });
  else
    return Yup.object().shape({
      predictType: Yup.string(
        "El tipo de pronóstico debe ser un texto"
      ).required("El tipo de pronóstico es obligatorio"),
      fromYear: Yup.string(
        "El año inicial de prónostico debe ser un texto"
      ).required("El año inicial de prónostico es obligatorio"),
      toYear: Yup.string(
        "El año final de prónostico debe ser un texto"
      ).required("El año final de prónostico es obligatorio"),
    });
}
