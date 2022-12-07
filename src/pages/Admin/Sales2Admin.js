import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditSale2Form,
  HeaderPage2,
  TableSale2Admin,
} from "../../components/Admin";
import { ModalBasic, ModalBoolean } from "../../components/Common";
import { useSale2 } from "../../hooks";

export function Sales2Admin() {
  const [showModal, setShowModal] = useState(false);
  const [showModalBoolean, setShowModalBoolean] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [dataSingleDelete, setDataSingleDelete] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, sales2, getSales2, deleteSale2 } = useSale2();

  useEffect(() => {
    getSales2();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseModalBoolean = () => setShowModalBoolean((prev) => !prev);
  const onRefetch = () => setRefetch((prev) => !prev);

  const addSale2 = () => {
    setTitleModal("Nueva venta");
    setContentModal(
      <AddEditSale2Form onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateSale2 = (data) => {
    setTitleModal("Actualizar venta");
    setContentModal(
      <AddEditSale2Form
        onClose={openCloseModal}
        onRefetch={onRefetch}
        sale2={data}
      />
    );
    openCloseModal();
  };

  const onDeleteSale2 = async (data) => {
    setDataSingleDelete(data);
    setTitleModal("Eliminar Venta");
    setContentModal(
      <h1>¿Esta seguro de que desea eliminar la venta {data?.title}?</h1>
    );
    openCloseModalBoolean();
  };

  return (
    <>
      <HeaderPage2 title="Ventas" btnTitle="Nueva Venta" btnClick={addSale2} />
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
        onClose={openCloseModalBoolean}
        onRefetch={onRefetch}
        title={titleModal}
        children={contentModal}
        deleteFunction={deleteSale2}
        data={dataSingleDelete}
      />
    </>
  );
}
