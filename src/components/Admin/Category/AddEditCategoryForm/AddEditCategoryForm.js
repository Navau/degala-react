import React, { useState, useCallback } from "react";
import { Form, Image, Button, Label, Checkbox } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { forEach, map, size } from "lodash";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { useCategory } from "../../../../hooks";

import "./AddEditCategoryForm.scss";

export function AddEditCategoryForm(props) {
  const { onClose, onRefetch, category } = props;
  const [previewImage, setPreviewImage] = useState(category?.image || null);
  const { addCategory, updateCategory } = useCategory();

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(
      category ? updateSchema(category) : newSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (category) {
          const responseUpdate = await updateCategory(category.id, formValue);
          if (responseUpdate?.err) {
            if (size(responseUpdate.err) > 0) {
              forEach(responseUpdate.err, (item) => {
                forEach(item, (error) => {
                  toast.error(error);
                });
              });
            }
          } else {
            toast.success("Actualizado!");
          }
        } else {
          const responseAdd = await addCategory(formValue);
          if (responseAdd?.err) {
            if (size(responseAdd.err) > 0) {
              forEach(responseAdd.err, (item) => {
                forEach(item, (error) => {
                  toast.error(error);
                });
              });
            }
          } else {
            toast.success("Registrado!");
          }
        }
        onRefetch();
        onClose();
      } catch (err) {
        console.log("ERROR", err);
        toast.error(err?.message);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Field>
        <Form.Input
          name="title"
          label="Nombre de la categoría (*Obligatorio)"
          placeholder="Nombre de la categoría"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
      </Form.Field>
      <div className="add-edit-user-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />{" "}
        Categoría Activa (*Obligatorio)
      </div>
      <Form.Field>
        <Button
          type="button"
          fluid
          color={formik.errors.image && "red"}
          {...getRootProps()}
        >
          {previewImage ? "Cambiar Imagen" : "Subir Imagen"} (*Obligatorio)
        </Button>
        <input {...getInputProps()} />
        <Image src={previewImage} fluid />
        {formik.errors.image && (
          <Label pointing prompt>
            {formik.errors.image}
          </Label>
        )}
      </Form.Field>

      <Button
        type="submit"
        primary
        fluid
        content={category ? "Actualizar" : "Crear"}
      />
    </Form>
  );
}

function initialValues(data) {
  return {
    title: data?.title || "",
    image: "",
    active:
      data?.active === false || data?.active === true ? data.active : false,
  };
}

function newSchema() {
  return {
    title: Yup.string()
      .trim(
        "El nombre de la categoría no debe incluir espacios en blanco por demas"
      )
      .strict(true)
      .min(1, "El nombre de la categoría debe contener como mínimo 1 caracter")
      .max(
        254,
        "El nombre de la categoría debe contener como máximo 254 caracteres"
      )
      .required("El nombre de la categoría es obligatorio"),
    image: Yup.string("La imagen no es válida")
      .required("La imagen es obligatorio")
      .test(
        "Valor correcto",
        "La imagen debe ser formato jpeg o png",
        (val, optionsValue) => {
          const typeFile = optionsValue.options.originalValue?.type;
          if (typeFile === "image/png" || typeFile === "image/jpeg")
            return true;
          return false;
        }
      ),
    active: Yup.boolean().default(true).required("El activo es obligatorio"),
  };
}

function updateSchema(data) {
  return {
    title: Yup.string().required(true),
    image: Yup.string("La imagen no es válida").test(
      "Valor correcto",
      "La imagen debe ser formato jpeg o png",
      (val, optionsValue) => {
        if (!data?.image) {
          const typeFile = optionsValue.options.originalValue?.type;
          if (
            typeFile?.includes("png") ||
            typeFile?.includes("jpeg") ||
            typeFile?.includes("jpg")
          )
            return true;
          return false;
        }
        return true;
      }
    ),
    active: Yup.boolean().default(true).required("El activo es obligatorio"),
  };
}
