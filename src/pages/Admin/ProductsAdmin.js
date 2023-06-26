import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditProductForm,
  HeaderPage2,
  TableProductAdmin,
} from "../../components/Admin";
import { ModalBasic, ModalBoolean } from "../../components/Common";
import { useProduct } from "../../hooks";
import { toast } from "react-toastify";

export function ProductsAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [showModalBoolean, setShowModalBoolean] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [actionsButtons, setActionsButtons] = useState({});
  const { loading, products, getProducts, deleteProduct, searchProducts } =
    useProduct();

  useEffect(() => {
    getProducts().catch((err) =>
      toast.error(
        err?.message || err?.detail || "Error al obtener los productos"
      )
    );
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseModalBoolean = () => setShowModalBoolean((prev) => !prev);
  const onRefresh = () => setRefetch((prev) => !prev);

  const addProduct = () => {
    setTitleModal("Nuevo producto");
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onRefetch={onRefresh} />
    );
    openCloseModal();
  };

  const updateProduct = (data) => {
    setTitleModal("Actualizar producto");
    setContentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onRefetch={onRefresh}
        product={data}
      />
    );
    openCloseModal();
  };

  const onDeleteProduct = async (data) => {
    setTitleModal("Eliminar Producto");
    setContentModal(
      <div>
        <h1>¿Esta seguro de que desea eliminar el producto {data?.title}?</h1>
      </div>
    );
    setActionsButtons({
      ok: {
        title: "Si, deseo eliminar",
        iconName: "checkmark",
        onClick: async () => {
          try {
            await deleteProduct(data.id);
            onRefresh();
            openCloseModalBoolean();
            toast.success("Eliminado!");
          } catch (err) {
            toast.success("Error al eliminar!");
          }
        },
      },
      cancel: {
        title: "No eliminar",
        iconName: "remove",
        onClick: () => {
          openCloseModalBoolean();
        },
      },
    });
    openCloseModalBoolean();
  };

  return (
    <>
      <HeaderPage2
        title="Productos"
        btnTitle="Nuevo Producto"
        btnClick={addProduct}
        options={[
          {
            input: {
              loading,
              className: "",
              icon: "search",
              title: "Buscar un producto",
              onChange: (value) =>
                searchProducts(value).catch((err) =>
                  toast.error(
                    err?.message ||
                      err?.detail ||
                      "Error al buscar los productos"
                  )
                ),
            },
            button: {
              loading,
              className: "button-reload-table-admin",
              icon: "redo",
              title: "Recargar información",
              onClick: () => onRefresh(),
            },
          },
        ]}
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
        title={titleModal}
        children={contentModal}
        onClose={openCloseModalBoolean}
        actions={actionsButtons}
      />
    </>
  );
}
