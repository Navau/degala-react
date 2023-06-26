import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  Image,
  Button,
  Checkbox,
  Dropdown,
  Label,
} from "semantic-ui-react";
import { find, forEach, isUndefined, map, size } from "lodash";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth, useCategory, useProduct, useSale2 } from "../../../../hooks";
import { REGEX_PATTERNS } from "../../../../utils/constants";

import "./AddEditSale2Form.scss";

export function AddEditSale2Form(props) {
  const { onClose, onRefetch, sale2 } = props;
  const { auth } = useAuth();
  const [categoriesFormat, setCategoriesFormat] = useState([]);
  const [productsFormat, setProductsFormat] = useState([]);
  const { categories, getCategories } = useCategory();
  const { products, getProductsByCategoryID, updateProductStock } =
    useProduct();
  const [productAux, setProductAux] = useState({
    stock: 0,
    price: 0.0,
    image: "",
  });
  const { addSale2, updateSale2 } = useSale2();
  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    setCategoriesFormat(formatDropdownData(categories));
  }, [categories]);
  useEffect(() => {
    setProductsFormat(formatDropdownData(products));
  }, [products]);

  const formik = useFormik({
    initialValues: initialValues(sale2, auth),
    validationSchema: Yup.object(sale2 ? updateSchema(auth) : newSchema(auth)),
    validateOnChange: true,
    onSubmit: async (formValue) => {
      try {
        if (sale2) {
          const responseUpdate = await updateSale2(sale2.id, formValue);
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
          const responseAdd = await addSale2(formValue);
          console.log(responseAdd);
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
        delete productAux.image;
        const responseProduct = await updateProductStock(productAux.id, {
          ...productAux,
          stock: productAux?.stock - formValue.quantity,
        });
        console.log(responseProduct);
        onRefetch();
        onClose();
      } catch (err) {
        console.log("ERROR", err);
        toast.error(err?.message);
      }
    },
  });

  return (
    <Form className="add-edit-sale2-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="user"
          label="Vendedor"
          value={auth.me.ci}
          onChange={formik.handleChange}
          error={formik.errors.user}
        />
        <Form.Field>
          <label>Categoría (*Obligatorio)</label>
          <Dropdown
            placeholder="Categoría"
            fluid
            selection
            search
            options={categoriesFormat}
            value={formik.values.category}
            error={!isUndefined(formik.errors.category)}
            onChange={async (_, data) => {
              formik.setFieldValue("category", data.value);
              formik.setFieldValue("product", null);
              await getProductsByCategoryID(data.value);
            }}
          />
          {formik.errors.category && (
            <Label pointing prompt>
              {formik.errors.category}
            </Label>
          )}
        </Form.Field>
        <Form.Field>
          <label>Producto (*Obligatorio)</label>
          <Dropdown
            placeholder="Producto"
            fluid
            selection
            search
            options={productsFormat}
            value={formik.values.product}
            error={!isUndefined(formik.errors.product)}
            onChange={(_, data) => {
              formik.setFieldValue("product", data.value);
              const resultFind = find(products, (item) => {
                if (item.id === data.value) return true;
              });
              setProductAux(resultFind);
            }}
          />
          {formik.errors.product && (
            <Label pointing prompt>
              {formik.errors.product}
            </Label>
          )}
        </Form.Field>
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="quantity"
          label="Cantidad a vender (*Obligatorio)"
          placeholder="Cantidad a vender"
          value={formik.values.quantity}
          onChange={(e) => {
            formik.setFieldValue("quantity", e.target.value);
            formik.setFieldValue("stock", productAux?.stock - e.target.value);
          }}
          error={formik.errors.quantity}
        />
        <Form.Input
          name="stock"
          label="Stock sobrante del producto seleccionado"
          placeholder="Stock sobrante del producto seleccionado"
          value={formik.values.stock}
          error={formik.errors.stock}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          type="number"
          name="payment"
          label="Pago en Bolivianos (*Obligatorio)"
          placeholder="Pago del producto"
          value={formik.values.payment}
          onChange={(e) => {
            formik.setFieldValue("payment", e.target.value);
            formik.setFieldValue(
              "change",
              (
                e.target.value -
                parseFloat(productAux?.price * formik.values.quantity)
              ).toFixed(2)
            );
          }}
          error={formik.errors.payment}
        />
        <Form.Input
          type="change"
          name="cambio"
          label="Cambio Total en bolivianos (*Obligatorio)"
          placeholder="Cambio Total"
          value={formik.values.change}
          error={formik.errors.change}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          type="number"
          name="price"
          label="Precio del producto seleccionado"
          placeholder="Precio"
          value={productAux?.price}
        />
        <Form.Input
          type="number"
          name="price"
          label="Precio total de las cantidades seleccionadas"
          placeholder="Precio"
          value={productAux?.price * formik.values.quantity}
        />
      </Form.Group>

      <Form.TextArea
        name="comment"
        label="Comentario de la venta (Opcional)"
        placeholder="Comentario de la venta"
        rows={5}
        value={formik.values.comment}
        onChange={formik.handleChange}
        error={formik.errors.comment}
      />
      <div className="add-edit-sale2-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />
        Venta activa (*Obligatorio)
      </div>
      <Button
        type="submit"
        primary
        fluid
        content={sale2 ? "Actualizar" : "Crear"}
      ></Button>
    </Form>
  );
}

function formatDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
    stock: item?.stock,
  }));
}

function initialValues(data, auth) {
  return {
    quantity: data?.quantity || 0,
    payment: data?.payment || 0.0,
    change: data?.change || 0.0,
    comment: data?.comment || "",
    stock: data?.product_data?.stock || 0,
    active:
      data?.active === false || data?.active === true ? data.active : false,
    user: auth?.me?.id || "",
    category: data?.category || undefined,
    product: data?.product || undefined,
  };
}

function newSchema(auth) {
  return {
    quantity: Yup.number()
      .typeError("La cantidad no es un número válido")
      .default(0)
      .test(
        "Es entero",
        "La cantidad no cumple con el formato correcto de número entero, ejemplo: '999999999'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.stock.test(options.originalValue);
          }
          return true;
        }
      )
      .required("La cantidad es obligatorio"),
    stock: Yup.number()
      .typeError("El stock no es un número válido")
      .default(0)
      .test(
        "Es entero",
        "El stock no cumple con el formato correcto de número entero, ejemplo: '999999999'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.stock.test(options.originalValue);
          }
          return true;
        }
      )
      .min(0, "El stock debe ser mayor o igual a 0")
      .max(100000000, "La cantidad debe ser menor a 100000000")
      .required("El stock es obligatorio"),
    payment: Yup.number()
      .typeError("El pago no es un número válido")
      .test(
        "Es decimal",
        "El pago no cumple con el formato correcto de número decimal, ejemplo: '99999.99'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.payment.test(options.originalValue);
          }
          return true;
        }
      )
      .required("El pago es obligatorio"),
    change: Yup.number()
      .typeError("El cambio no es un número válido")
      .test(
        "Es decimal",
        "El cambio no cumple con el formato correcto de número decimal, ejemplo: '99999.99'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.price.test(options.originalValue);
          }
          return true;
        }
      )
      .required("El cambio es obligatorio"),
    comment: Yup.string()
      .trim("La descripción no debe incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "La descripción debe contener como minimo 1 caracter")
      .max(999, "La descripción debe contener como máximo 999 caracteres"),
    user: Yup.number()
      .default(auth.me.id)
      .typeError("La usuario no es un valor válido")
      .required("La usuario es obligatorio"),
    category: Yup.number()
      .typeError("La categoría no es un valor válido")
      .required("La categoría es obligatorio"),
    product: Yup.number()
      .typeError("El producto no es un valor válido")
      .required("El producto es obligatorio"),
  };
}

function updateSchema(auth) {
  return {
    quantity: Yup.number()
      .typeError("La cantidad no es un número válido")
      .default(0)
      .test(
        "Es entero",
        "La cantidad no cumple con el formato correcto de número entero, ejemplo: '999999999'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.stock.test(options.originalValue);
          }
          return true;
        }
      )
      .required("La cantidad es obligatorio"),
    stock: Yup.number()
      .typeError("El stock no es un número válido")
      .default(0)
      .test(
        "Es entero",
        "El stock no cumple con el formato correcto de número entero, ejemplo: '999999999'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.stock.test(options.originalValue);
          }
          return true;
        }
      )
      .min(0, "El stock debe ser mayor o igual a 0")
      .max(100000000, "La cantidad debe ser menor a 100000000")
      .required("El stock es obligatorio"),
    payment: Yup.number()
      .typeError("El pago no es un número válido")
      .test(
        "Es decimal",
        "El pago no cumple con el formato correcto de número decimal, ejemplo: '99999.99'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.payment.test(options.originalValue);
          }
          return true;
        }
      )
      .required("El pago es obligatorio"),
    change: Yup.number()
      .typeError("El cambio no es un número válido")
      .test(
        "Es decimal",
        "El cambio no cumple con el formato correcto de número decimal, ejemplo: '99999.99'",
        (val, options) => {
          if (val !== undefined) {
            return REGEX_PATTERNS.price.test(options.originalValue);
          }
          return true;
        }
      )
      .required("El cambio es obligatorio"),
    comment: Yup.string()
      .trim("La descripción no debe incluir espacios en blanco por demas")
      .strict(true)
      .min(1, "La descripción debe contener como minimo 1 caracter")
      .max(999, "La descripción debe contener como máximo 999 caracteres"),
    user: Yup.number()
      .default(auth.me.id)
      .typeError("La usuario no es un valor válido")
      .required("La usuario es obligatorio"),
    category: Yup.number()
      .typeError("La categoría no es un valor válido")
      .required("La categoría es obligatorio"),
    product: Yup.number()
      .typeError("El producto no es un valor válido")
      .required("El producto es obligatorio"),
  };
}
