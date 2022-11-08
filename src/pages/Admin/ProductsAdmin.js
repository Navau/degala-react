import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditProductForm,
  HeaderPage2,
  TableProductAdmin,
} from "../../components/Admin";
import { ModalBasic, ModalBoolean } from "../../components/Common";
import { useProduct } from "../../hooks";

export function ProductsAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [showModalBoolean, setShowModalBoolean] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [dataSingleDelete, setDataSingleDelete] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, products, getProducts, deleteProduct } = useProduct();

  useEffect(() => {
    getProducts();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseModalBoolean = () => setShowModalBoolean((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addProduct = () => {
    setTitleModal("Nuevo producto");
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateProduct = (data) => {
    setTitleModal("Actualizar producto");
    setContentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={data}
      />
    );
    openCloseModal();
  };

  const onDeleteProduct = async (data) => {
    setDataSingleDelete(data);
    setTitleModal("Eliminar Producto");
    setContentModal(
      <h1>¿Esta seguro de que desea eliminar el producto {data?.title}?</h1>
    );
    openCloseModalBoolean();
  };

  return (
    <>
      <HeaderPage2
        title="Productos"
        btnTitle="Nuevo Producto"
        btnClick={addProduct}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableProductAdmin
          products={products}
          updateProduct={updateProduct}
          onDeleteProduct={onDeleteProduct}
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
        size="small"
      />
      <ModalBoolean
        show={showModalBoolean}
        onClose={openCloseModalBoolean}
        onRefetch={onRefetch}
        title={titleModal}
        children={contentModal}
        deleteFunction={deleteProduct}
        data={dataSingleDelete}
      />
    </>
  );
}
