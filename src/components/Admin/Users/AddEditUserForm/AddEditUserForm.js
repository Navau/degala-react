import React from "react";
import { Form, Button, Checkbox } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./AddEditUserForm.scss";
import { useUser } from "../../../../hooks";
import { REGEX_PATTERNS } from "../../../../utils/constants";

export function AddEditUserForm(props) {
  const { onClose, onRefresh, user } = props;
  const { addUser, updateUser } = useUser();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(user ? updateSchema() : newSchema()),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        if (user) {
          await updateUser(user.id, formValue);
        } else {
          await addUser(formValue);
        }
        onRefresh();
        onClose();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const {} = props;
  return (
    <Form className="add-edit-user-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="ci"
          label="N° Carnet de Identidad (Opcional)"
          placeholder="N° Carnet de Identidad"
          value={formik.values.ci}
          onChange={formik.handleChange}
          error={formik.errors.ci}
        />
      </Form.Group>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="username"
          label="Nombre de Usuario (Opcional)"
          placeholder="Nombre de Usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <Form.Input
          name="email"
          label="Correo Electrónico (*Obligatorio)"
          placeholder="Correo Electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
      </Form.Group>
      <Form.Group widths={"equal"}>
        <Form.Input
          name="first_name"
          label="Nombre (Opcional)"
          placeholder="Nombre"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.errors.first_name}
        />
        <Form.Input
          name="last_name"
          label="Apellidos (Opcional)"
          placeholder="Apellidos"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.errors.last_name}
        />
      </Form.Group>
      <Form.Input
        name="password"
        type="password"
        label="Contraseña (Opcional)"
        placeholder="Contraseña"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="add-edit-user-form__active">
        <Checkbox
          toggle
          checked={formik.values.is_active}
          onChange={(_, data) =>
            formik.setFieldValue("is_active", data.checked)
          }
        />{" "}
        Usuario Activo (*Obligatorio)
      </div>
      <div className="add-edit-user-form__staff">
        <Checkbox
          toggle
          checked={formik.values.is_staff}
          onChange={(_, data) => formik.setFieldValue("is_staff", data.checked)}
        />{" "}
        Usuario Administrador
      </div>

      <Button
        type="submit"
        primary
        fluid
        content={user ? "Actualizar" : "Crear"}
      />
    </Form>
  );
}

function initialValues(data) {
  return {
    ci: data?.ci || "",
    username: data?.username || "",
    email: data?.email || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    password: "",
    is_active: data?.is_active ? data.is_active : true,
    is_staff: data?.is_staff ? data.is_staff : false,
  };
}

function newSchema() {
  return {
    ci: Yup.number()
      .typeError("El carnet de identidad no es un número válido")
      .default(0)
      .test(
        "Es entero",
        "El carnet de identidad no cumple con el formato correcto de número entero, ejemplo: '999999999'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.ci.test(options.originalValue);
          }
          return true;
        }
      ),
    username: Yup.string()
      .trim("El nombre de usuario no debe incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "El nombre de usuario debe contener como mínimo 1 caracter")
      .max(25, "El nombre de usuario debe contener como máximo 25 caracteres"),
    email: Yup.string()
      .trim(
        "El correo electrónico no debe incluir espacios en blanco por demas"
      )
      .strict(true)
      .email("El correo electrónico no es válido")
      .min(1, "El correo electrónico debe contener como mínimo 1 caracter")
      .max(
        100,
        "El correo electrónico debe contener como máximo 100 caracteres"
      )
      .required("El correo electrónico es obligatorio"),
    first_name: Yup.string()
      .trim("El nombre no debe incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "El nombre debe contener como mínimo 1 caracter")
      .max(100, "El nombre debe contener como máximo 100 caracteres"),
    last_name: Yup.string()
      .trim("Los apellidos no deben incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "Los apellidos deben contener como mínimo 1 caracter")
      .max(100, "Los apellidos deben contener como máximo 100 caracteres"),
    password: Yup.string()
      .trim("La contraseña no debe incluir espacios en blanco")
      .strict(true)
      .min(6, "La contraseña debe contener como mínimo 6 caracter")
      .max(100, "La contraseña debe contener como máximo 100 caracteres"),
    active: Yup.boolean().default(true).required("El activo es obligatorio"),
    is_staff: Yup.boolean().default(false),
  };
}

function updateSchema() {
  return {
    ci: Yup.number()
      .typeError("El carnet de identidad no es un número válido")
      .default(0)
      .test(
        "Es entero",
        "El carnet de identidad no cumple con el formato correcto de número entero, ejemplo: '999999999'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.ci.test(options.originalValue);
          }
          return true;
        }
      ),
    username: Yup.string()
      .trim("El nombre de usuario no debe incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "El nombre de usuario debe contener como mínimo 1 caracter")
      .max(25, "El nombre de usuario debe contener como máximo 25 caracteres"),
    email: Yup.string()
      .trim(
        "El correo electrónico no debe incluir espacios en blanco por demas"
      )
      .strict(true)
      .email("El correo electrónico no es válido")
      .min(1, "El correo electrónico debe contener como mínimo 1 caracter")
      .max(
        100,
        "El correo electrónico debe contener como máximo 100 caracteres"
      )
      .required("El correo electrónico es obligatorio"),
    first_name: Yup.string()
      .trim("El nombre no debe incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "El nombre debe contener como mínimo 1 caracter")
      .max(100, "El nombre debe contener como máximo 100 caracteres"),
    last_name: Yup.string()
      .trim("Los apellidos no deben incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "Los apellidos deben contener como mínimo 1 caracter")
      .max(100, "Los apellidos deben contener como máximo 100 caracteres"),
    password: Yup.string()
      .trim("La contraseña no debe incluir espacios en blanco")
      .strict(true)
      .min(6, "La contraseña debe contener como mínimo 6 caracter")
      .max(100, "La contraseña debe contener como máximo 100 caracteres"),
    active: Yup.boolean().default(true).required("El activo es obligatorio"),
    is_staff: Yup.boolean().default(false),
  };
}
