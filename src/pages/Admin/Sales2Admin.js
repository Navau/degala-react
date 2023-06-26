import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditSale2Form,
  HeaderPage2,
  TableSale2Admin,
} from "../../components/Admin";
import { ModalBasic, ModalBoolean } from "../../components/Common";
import { useSale2 } from "../../hooks";
import { toast } from "react-toastify";

export function Sales2Admin() {
  const [showModal, setShowModal] = useState(false);
  const [showModalBoolean, setShowModalBoolean] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [actionsButtons, setActionsButtons] = useState({});
  const { loading, sales2, getSales2, deleteSale2, searchSales2 } = useSale2();

  useEffect(() => {
    getSales2().catch((err) =>
      toast.error(err?.message || err?.detail || "Error al obtener las ventas")
    );
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseModalBoolean = () => setShowModalBoolean((prev) => !prev);
  const onRefresh = () => setRefetch((prev) => !prev);

  const addSale2 = () => {
    setTitleModal("Nueva venta");
    setContentModal(
      <AddEditSale2Form onClose={openCloseModal} onRefetch={onRefresh} />
    );
    openCloseModal();
  };

  const updateSale2 = (data) => {
    setTitleModal("Actualizar venta");
    setContentModal(
      <AddEditSale2Form
        onClose={openCloseModal}
        onRefetch={onRefresh}
        sale2={data}
      />
    );
    openCloseModal();
  };

  const onDeleteSale2 = async (data) => {
    console.log({ data });
    setTitleModal("Eliminar Venta");
    setContentModal(
      <div>
        <h1>
          ¿Esta seguro de que desea eliminar la venta{" "}
          {data?.product_data?.product}?
        </h1>
      </div>
    );
    setActionsButtons({
      ok: {
        title: "Si, deseo eliminar",
        iconName: "checkmark",
        onClick: async () => {
          try {
            await deleteSale2(data.id);
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
        title="Ventas"
        btnTitle="Nueva Venta"
        btnClick={addSale2}
        options={[
          {
            input: {
              loading,
              className: "",
              icon: "search",
              title: "Buscar una venta",
              onChange: (value) =>
                searchSales2(value).catch((err) =>
                  toast.error(
                    err?.message || err?.detail || "Error al buscar las ventas"
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
        <TableSale2Admin
          sales2={sales2}
          updateSale2={updateSale2}
          onDeleteSale2={onDeleteSale2}
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
