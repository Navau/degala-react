import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage2,
  TableFabrics,
  AddEditFabricForm,
  DeleteFabricForm,
} from "../../components/Admin";
import { ModalBasic, ModalBoolean } from "../../components/Common";
import { useFabric } from "../../hooks/useFabric";
import { toast } from "react-toastify";

export function FabricsAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [showModalBoolean, setShowModalBoolean] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [actionsButtons, setActionsButtons] = useState({});

  const { loading, error, fabrics, getFabrics, deleteFabric, searchFabrics } =
    useFabric();

  useEffect(() => {
    getFabrics().catch((err) =>
      toast.error(
        err?.message || err?.detail || "Error al obtener las categorías"
      )
    );
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseModalBoolean = () => setShowModalBoolean((prev) => !prev);
  const onRefresh = () => setRefetch((prev) => !prev);

  const addFabric = () => {
    setTitleModal("Nueva tela");
    setContentModal(
      <AddEditFabricForm onClose={openCloseModal} onRefresh={onRefresh} />
    );
    openCloseModal();
  };

  const updateFabric = (data) => {
    setTitleModal("Actualizar tela");
    setContentModal(
      <AddEditFabricForm
        onClose={openCloseModal}
        onRefresh={onRefresh}
        fabric={data}
      />
    );
    openCloseModal();
  };

  const onDeleteFabric = (data) => {
    setTitleModal("Eliminar tela");
    setContentModal(<DeleteFabricForm fabric={data} />);
    setActionsButtons({
      ok: {
        title: "Si, deseo eliminar",
        iconName: "checkmark",
        onClick: async () => {
          try {
            await deleteFabric(data.id);
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
        title="Telas"
        btnTitle="Nueva Tela"
        btnClick={addFabric}
        options={[
          {
            input: {
              loading,
              className: "",
              icon: "search",
              title: "Buscar una tela",
              onChange: (value) =>
                searchFabrics(value).catch((err) =>
                  toast.error(
                    err?.message || err?.detail || "Error al buscar las telas"
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
        <TableFabrics
          fabrics={fabrics}
          updateFabric={updateFabric}
          onDeleteFabric={onDeleteFabric}
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
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
