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

export function FabricsAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [showModalBoolean, setShowModalBoolean] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [dataSingleDelete, setDataSingleDelete] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, error, fabrics, getFabrics, deleteFabric } = useFabric();

  useEffect(() => {
    getFabrics();
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
    setDataSingleDelete(data);
    setTitleModal("Eliminar tela");
    setContentModal(<DeleteFabricForm fabric={data} />);
    openCloseModalBoolean();
  };

  return (
    <>
      <HeaderPage2 title="Telas" btnTitle="Nueva Tela" btnClick={addFabric} />
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
        onClose={openCloseModalBoolean}
        onRefetch={onRefresh}
        title={titleModal}
        children={contentModal}
        deleteFunction={deleteFabric}
        data={dataSingleDelete}
      />
    </>
  );
}
