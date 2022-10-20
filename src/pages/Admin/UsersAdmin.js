import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage2,
  TableUsers,
  AddEditUserForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useUser } from "../../hooks/useUser";

export function UsersAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const { loading, error, users, getUsers, deleteUser } = useUser();

  useEffect(() => {
    getUsers();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefresh = () => setRefetch((prev) => !prev);

  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} onRefresh={onRefresh} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Actualizar usuario");
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        onRefresh={onRefresh}
        user={data}
      />
    );
    openCloseModal();
  };

  const onDeleteUser = async (data) => {
    const result = window.confirm(
      `¿Estas seguro de que quieres eliminar a ${data.email}?`
    );
    if (result) {
      try {
        await deleteUser(data.id);
        onRefresh();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <HeaderPage2
        title="Usuarios"
        btnTitle="Nuevo Usuario"
        btnClick={addUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
        />
      )}
      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
