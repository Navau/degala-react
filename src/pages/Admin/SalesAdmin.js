// import React, { useState, useEffect } from "react";
// import { Loader } from "semantic-ui-react";
// import {
//   AddEditSaleForm,
//   HeaderPage2,
//   TableSaleAdmin,
// } from "../../components/Admin";
// import { ModalBasic, ModalBoolean } from "../../components/Common";
// import { useSale } from "../../hooks";

// export function SalesAdmin() {
//   const [showModal, setShowModal] = useState(false);
//   const [showModalBoolean, setShowModalBoolean] = useState(false);
//   const [titleModal, setTitleModal] = useState(null);
//   const [contentModal, setContentModal] = useState(null);
//   const [dataSingleDelete, setDataSingleDelete] = useState(null);
//   const [refetch, setRefetch] = useState(false);
//   const { loading, sales, getSales, deleteSale } = useSale();

//   useEffect(() => {
//     getSales();
//   }, [refetch]);

//   const openCloseModal = () => setShowModal((prev) => !prev);
//   const openCloseModalBoolean = () => setShowModalBoolean((prev) => !prev);
//   const onRefetch = () => setRefetch((prev) => !prev);

//   const addSale = () => {
//     setTitleModal("Nueva venta");
//     setContentModal(
//       <AddEditSaleForm onClose={openCloseModal} onRefetch={onRefetch} />
//     );
//     openCloseModal();
//   };

//   const updateSale = (data) => {
//     setTitleModal("Actualizar venta");
//     setContentModal(
//       <AddEditSaleForm
//         onClose={openCloseModal}
//         onRefetch={onRefetch}
//         sale={data}
//       />
//     );
//     openCloseModal();
//   };

//   const onDeleteSale = async (data) => {
//     setDataSingleDelete(data);
//     setTitleModal("Eliminar Venta");
//     setContentModal(<h1>¿Esta seguro de que desea eliminar la venta?</h1>);
//     openCloseModalBoolean();
//   };

//   return (
//     <>
//       <HeaderPage2 title="Ventas" btnTitle="Nueva Venta" btnClick={addSale} />
//       {loading ? (
//         <Loader active inline="centered">
//           Cargando...
//         </Loader>
//       ) : (
//         <TableSaleAdmin
//           sales={sales}
//           updateSale={updateSale}
//           onDeleteSale={onDeleteSale}
//         />
//       )}
//       <ModalBasic
//         show={showModal}
//         onClose={openCloseModal}
//         title={titleModal}
//         children={contentModal}
//         size="small"
//       />
//       <ModalBoolean
//         show={showModalBoolean}
//         onClose={openCloseModalBoolean}
//         onRefetch={onRefetch}
//         title={titleModal}
//         children={contentModal}
//         deleteFunction={deleteSale}
//         data={dataSingleDelete}
//       />
//     </>
//   );
// }
