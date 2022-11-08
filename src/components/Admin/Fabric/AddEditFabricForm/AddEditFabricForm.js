import React from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./AddEditFabricForm.scss";
import { useFabric } from "../../../../hooks";
import { REGEX_PATTERNS } from "../../../../utils/constants";

export function AddEditFabricForm(props) {
  const { onClose, onRefresh, fabric } = props;
  const { addFabric, updateFabric } = useFabric();

  const formik = useFormik({
    initialValues: initialValues(fabric),
    validationSchema: Yup.object(fabric ? updateSchema() : newSchema()),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        if (fabric) {
          await updateFabric(fabric.id, formValue);
        } else {
          await addFabric(formValue);
        }
        onRefresh();
        onClose();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Form className="add-edit-fabric-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="title"
          label="Nombre de Tela (*Obligatorio)"
          placeholder="Nombre de Tela"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Form.Input
          name="price"
          label="Precio (*Obligatorio)"
          placeholder="Precio"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
        />
      </Form.Group>
      <Form.TextArea
        name="description"
        label="Descripción (Opcional)"
        placeholder="Descripción"
        rows={5}
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
      />
      <div className="add-edit-fabric-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />{" "}
        Tela Activa (*Obligatorio)
      </div>

      <Button
        type="submit"
        primary
        fluid
        content={fabric ? "Actualizar" : "Crear"}
      />
    </Form>
  );
}

function initialValues(data) {
  return {
    title: data?.title || "",
    price: data?.price || "",
    description: data?.description || "",
    active:
      data?.active === true || data?.active === false ? data.active : true,
  };
}

function newSchema() {
  return {
    title: Yup.string()
      .trim("El nombre de la tela no debe incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "El nombre de la tela debe contener como minimo 1 caracter")
      .max(254, "El nombre de la tela debe contener como máximo 254 caracteres")
      .required("El nombre de la tela es obligatorio"),
    price: Yup.number()
      .typeError("El precio no es un número válido")
      .test(
        "Es decimal",
        "El precio no cumple con el formato correcto de número decimal, ejemplo: '9999.99'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.price.test(options.originalValue);
          }
          return true;
        }
      )
      .min(1, "El precio debe ser mayor a 0")
      .max(9999, "El precio debe ser menor a 9999")
      .required("El precio es obligatorio"),
    description: Yup.string()
      .trim("La descripción no debe incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "La descripción debe contener como minimo 1 caracter")
      .max(999, "La descripción debe contener como máximo 999 caracteres"),
    active: Yup.boolean().required("El activo es obligatorio"),
  };
}

function updateSchema() {
  return {
    title: Yup.string()
      .trim("El nombre de la tela no debe incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "El nombre de la tela debe contener como minimo 1 caracter")
      .max(254, "El nombre de la tela debe contener como máximo 254 caracteres")
      .required("El nombre de la tela es obligatorio"),
    price: Yup.number()
      .typeError("El precio no es un número válido")
      .test(
        "Es decimal",
        "El precio no cumple con el formato correcto de número decimal, ejemplo: '9999.99'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.price.test(options.originalValue);
          }
          return true;
        }
      )
      .min(1, "El precio debe ser mayor a 0")
      .max(9999, "El precio debe ser menor a 9999")
      .required("El precio es obligatorio"),
    description: Yup.string()
      .trim("La descripción no debe incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "La descripción debe contener como minimo 1 caracter")
      .max(999, "La descripción debe contener como máximo 999 caracteres"),
    active: Yup.boolean().required("El activo es obligatorio"),
  };
}
