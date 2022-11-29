// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Form,
//   Image,
//   Button,
//   Checkbox,
//   Dropdown,
//   Label,
// } from "semantic-ui-react";
// import { map } from "lodash";
// import { useDropzone } from "react-dropzone";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useCategory, useFabric, useSale } from "../../../../hooks";
// import { GENRE_PRODUCT, REGEX_PATTERNS } from "../../../../utils/constants";

// import "./AddEditSaleForm.scss";

// export function AddEditSaleForm(props) {
//   const { onClose, onRefetch, sale } = props;
//   const [categoriesFormat, setCategoriesFormat] = useState([]);
//   const [previewImage, setPreviewImage] = useState(sale?.image || null);
//   const [fabricsFormat, setFabricsFormat] = useState([]);
//   const { categories, getCategories } = useCategory();
//   const { fabrics, getFabrics } = useFabric();
//   const { addSale, updateSale } = useSale();
//   useEffect(() => {
//     getCategories();
//   }, []);
//   useEffect(() => {
//     getFabrics();
//   }, []);
//   useEffect(() => {
//     setCategoriesFormat(formatDropdownData(categories));
//   }, [categories]);
//   useEffect(() => {
//     setFabricsFormat(formatDropdownData(fabrics));
//   }, [fabrics]);

//   const formik = useFormik({
//     initialValues: initialValues(sale),
//     validationSchema: Yup.object(sale ? updateSchema() : newSchema()),
//     validateOnChange: true,
//     onSubmit: async (formValue) => {
//       if (sale) {
//         await updateSale(sale.id, formValue);
//       } else {
//         await addSale(formValue);
//       }
//       onRefetch();
//       onClose();
//     },
//   });

//   const onDrop = useCallback(async (acceptedFile) => {
//     const file = acceptedFile[0];
//     await formik.setFieldValue("image", file);
//     setPreviewImage(URL.createObjectURL(file));
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/jpeg, image/png",
//     noKeyboard: true,
//     multiple: false,
//     onDrop,
//   });

//   return (
//     <Form className="add-edit-sale-form" onSubmit={formik.handleSubmit}>
//       <Form.Group widths="equal">
//         <Form.Input
//           name="title"
//           label="Nombre del Venta (*Obligatorio)"
//           placeholder="Nombre del Venta"
//           value={formik.values.title}
//           onChange={formik.handleChange}
//           error={formik.errors.title}
//         />
//         <Form.Input
//           name="color"
//           label="Color (Opcional)"
//           placeholder="Color"
//           value={formik.values.color}
//           onChange={formik.handleChange}
//           error={formik.errors.color}
//         />
//       </Form.Group>
//       <Form.Group widths="equal">
//         <Form.Input
//           type="number"
//           name="price"
//           label="Precio (*Obligatorio)"
//           placeholder="Precio"
//           value={formik.values.price}
//           onChange={formik.handleChange}
//           error={formik.errors.price}
//         />
//         <Form.Input
//           type="number"
//           name="stock"
//           label="Stock (*Obligatorio)"
//           placeholder="Stock"
//           value={formik.values.stock}
//           onChange={formik.handleChange}
//           error={formik.errors.stock}
//         />
//       </Form.Group>
//       <Form.Group widths="equal">
//         <Form.Field>
//           <label>Género (*Obligatorio)</label>
//           <Dropdown
//             placeholder="Género"
//             fluid
//             selection
//             search
//             options={formatDropdownGenre()}
//             value={formik.values.genre}
//             error={formik.errors.genre}
//             onChange={(_, data) => formik.setFieldValue("genre", data.value)}
//           />
//           {formik.errors.genre && (
//             <Label pointing prompt>
//               {formik.errors.genre}
//             </Label>
//           )}
//         </Form.Field>
//         <Form.Field>
//           <label>Categoría (*Obligatorio)</label>
//           <Dropdown
//             placeholder="Categoría"
//             fluid
//             selection
//             search
//             options={categoriesFormat}
//             value={formik.values.category}
//             error={formik.errors.category}
//             onChange={(_, data) => formik.setFieldValue("category", data.value)}
//             onBlur
//           />
//           {formik.errors.category && (
//             <Label pointing prompt>
//               {formik.errors.category}
//             </Label>
//           )}
//         </Form.Field>
//         <Form.Field>
//           <label>Tela (*Obligatorio)</label>
//           <Dropdown
//             placeholder="Tela"
//             fluid
//             selection
//             search
//             options={fabricsFormat}
//             value={formik.values.fabric}
//             error={formik.errors.fabric}
//             onChange={(_, data) => formik.setFieldValue("fabric", data.value)}
//           />
//           {formik.errors.fabric && (
//             <Label pointing prompt>
//               {formik.errors.fabric}
//             </Label>
//           )}
//         </Form.Field>
//       </Form.Group>
//       <Form.TextArea
//         name="description"
//         label="Descripción (Opcional)"
//         placeholder="Descripción"
//         rows={5}
//         value={formik.values.description}
//         onChange={formik.handleChange}
//         error={formik.errors.description}
//       />
//       <div className="add-edit-sale-form__active">
//         <Checkbox
//           toggle
//           checked={formik.values.active}
//           onChange={(_, data) => formik.setFieldValue("active", data.checked)}
//         />
//         Venta activo (*Obligatorio)
//       </div>
//       <Form.Field>
//         <Button
//           type="button"
//           fluid
//           {...getRootProps()}
//           color={formik.errors.image && "red"}
//         >
//           {previewImage ? "Cambiar Imagen" : "Subir Imagen"} *Obligatorio
//         </Button>
//         <input {...getInputProps()} />
//         <Image src={previewImage} fluid />
//         {formik.errors.image && (
//           <Label pointing prompt>
//             {formik.errors.image}
//           </Label>
//         )}
//       </Form.Field>
//       <Button
//         type="submit"
//         primary
//         fluid
//         content={sale ? "Actualizar" : "Crear"}
//       ></Button>
//     </Form>
//   );
// }

// function formatDropdownGenre() {
//   return [
//     {
//       key: 0,
//       text: "Masculino",
//       value: GENRE_PRODUCT.MALE,
//     },
//     {
//       key: 1,
//       text: "Femenino",
//       value: GENRE_PRODUCT.FEMALE,
//     },
//     {
//       key: 2,
//       text: "Sin género",
//       value: GENRE_PRODUCT.UNDEFINED,
//     },
//     {
//       key: 3,
//       text: "Otro",
//       value: GENRE_PRODUCT.OTHER,
//     },
//   ];
// }

// function formatDropdownData(data) {
//   return map(data, (item) => ({
//     key: item.id,
//     text: item.title,
//     value: item.id,
//   }));
// }

// function initialValues(data) {
//   return {
//     title: data?.title || "",
//     price: data?.price || "",
//     color: data?.color || "",
//     stock: data?.stock || 0,
//     genre: data?.genre || "",
//     description: data?.description || "",
//     category: data?.category || "",
//     fabric: data?.fabric || "",
//     active: data?.active ? data.active : true,
//     image: "",
//   };
// }

// function newSchema() {
//   return {
//     title: Yup.string()
//       .trim("El nombre del venta no debe incluir espacios en blanco por demas")
//       .strict(true)
//       .min(1, "El nombre del venta debe contener como mínimo 1 caracter")
//       .max(254, "El nombre del venta debe contener como máximo 254 caracteres")
//       .required("El nombre del venta es obligatorio"),
//     price: Yup.number()
//       .typeError("El precio no es un número válido")
//       .test(
//         "Es decimal",
//         "El precio no cumple con el formato correcto de número decimal, ejemplo: '99999.99'",
//         (val, options) => {
//           if (val !== undefined) {
//             return REGEX_PATTERNS.price.test(options.originalValue);
//           }
//           return true;
//         }
//       )
//       .min(1, "El precio debe ser mayor a 0")
//       .max(9999, "El precio debe ser menor a 9999")
//       .required("El precio es obligatorio"),
//     color: Yup.string()
//       .trim("El color no debe incluir espacios en blanco por demas")
//       .strict(true)
//       .min(1, "El color debe contener como mínimo 1 caracter")
//       .max(50, "El color debe contener como máximo 50 caracteres"),
//     stock: Yup.number()
//       .typeError("El stock no es un número válido")
//       .default(0)
//       .test(
//         "Es entero",
//         "El stock no cumple con el formato correcto de número entero, ejemplo: '999999999'",
//         (val, options) => {
//           if (val !== undefined) {
//             return REGEX_PATTERNS.stock.test(options.originalValue);
//           }
//           return true;
//         }
//       )
//       .min(0, "El stock debe ser mayor o igual a 0")
//       .max(100000000, "El stock debe ser menor a 100000000")
//       .required("El stock es obligatorio"),
//     genre: Yup.string()
//       .trim("El género no debe incluir espacios en blanco por demas")
//       .default("undefined")
//       .strict(true)
//       .test(
//         "Valor correcto",
//         "El género debe ser uno de estos valores ['Masculino', 'Femenino', 'Sin género', 'otro']",
//         (val, options) => {
//           return true;
//         }
//       )
//       .min(1, "El género debe contener como mínimo 1 caracter")
//       .max(254, "El género debe contener como máximo 254 caracteres")
//       .required("El género es obligatorio"),
//     description: Yup.string()
//       .trim("La descripción no debe incluir espacios en blanco por demas")
//       .strict(true)
//       .min(1, "La descripción debe contener como minimo 1 caracter")
//       .max(999, "La descripción debe contener como máximo 999 caracteres"),
//     category: Yup.number()
//       .typeError("La categoría no es un valor válido")
//       .required("La categoría es obligatorio"),
//     fabric: Yup.number()
//       .typeError("La tela no es un valor válido")
//       .required("La tela es obligatorio"),
//     active: Yup.boolean().default(true).required("El activo es obligatorio"),
//     image: Yup.string("La imagen no es válida")
//       .required("La imagen es obligatorio")
//       .test(
//         "Valor correcto",
//         "La imagen debe ser formato jpeg o png",
//         (val, optionsValue) => {
//           const typeFile = optionsValue.options.originalValue?.type;
//           if (typeFile === "image/png" || typeFile === "image/jpeg")
//             return true;
//           return false;
//         }
//       ),
//   };
// }

// function updateSchema() {
//   return {
//     title: Yup.string()
//       .trim("El nombre del venta no debe incluir espacios en blanco por demas")
//       .strict(true)
//       .min(1, "El nombre del venta debe contener como mínimo 1 caracter")
//       .max(254, "El nombre del venta debe contener como máximo 254 caracteres")
//       .required("El nombre del venta es obligatorio"),
//     price: Yup.number()
//       .typeError("El precio no es un número válido")
//       .test(
//         "Es decimal",
//         "El precio no cumple con el formato correcto de número decimal, ejemplo: '99999.99'",
//         (val, options) => {
//           if (val !== undefined) {
//             return REGEX_PATTERNS.price.test(options.originalValue);
//           }
//           return true;
//         }
//       )
//       .min(1, "El precio debe ser mayor a 0")
//       .max(9999, "El precio debe ser menor a 9999")
//       .required("El precio es obligatorio"),
//     color: Yup.string()
//       .trim("El color no debe incluir espacios en blanco por demas")
//       .strict(true)
//       .min(1, "El color debe contener como mínimo 1 caracter")
//       .max(50, "El color debe contener como máximo 50 caracteres"),
//     stock: Yup.number()
//       .typeError("El stock no es un número válido")
//       .default(0)
//       .test(
//         "Es entero",
//         "El stock no cumple con el formato correcto de número decimal, ejemplo: '999999999'",
//         (val, options) => {
//           if (val !== undefined) {
//             return REGEX_PATTERNS.stock.test(options.originalValue);
//           }
//           return true;
//         }
//       )
//       .min(0, "El stock debe ser mayor o igual a 0")
//       .max(100000000, "El stock debe ser menor a 100000000")
//       .required("El stock es obligatorio"),
//     genre: Yup.string()
//       .trim("El género no debe incluir espacios en blanco por demas")
//       .default("undefined")
//       .strict(true)
//       .test(
//         "Valor correcto",
//         "El género debe ser uno de estos valores ['Masculino', 'Femenino', 'Sin género', 'otro']",
//         (val, options) => {
//           return true;
//         }
//       )
//       .min(1, "El género debe contener como mínimo 1 caracter")
//       .max(254, "El género debe contener como máximo 254 caracteres")
//       .required("El género es obligatorio"),
//     description: Yup.string()
//       .trim("La descripción no debe incluir espacios en blanco por demas")
//       .strict(true)
//       .min(1, "La descripción debe contener como minimo 1 caracter")
//       .max(999, "La descripción debe contener como máximo 999 caracteres"),
//     category: Yup.number()
//       .typeError("La categoría no es un valor válido")
//       .required("La categoría es obligatorio"),
//     fabric: Yup.number()
//       .typeError("La tela no es un valor válido")
//       .required("La tela es obligatorio"),
//     active: Yup.boolean().default(true).required("El activo es obligatorio"),
//     image: Yup.string("La imagen no es válida").test(
//       "Valor correcto",
//       "La imagen debe ser formato jpeg o png",
//       (val, optionsValue) => {
//         const typeFile = optionsValue.options.originalValue?.type;
//         if (typeFile === "image/png" || typeFile === "image/jpeg") return true;
//         return false;
//       }
//     ),
//   };
// }
