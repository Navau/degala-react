import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Icon, Loader, Pagination } from "semantic-ui-react";
import {
  HeaderPage2,
  TableUsers,
  AddEditUserForm,
} from "../../components/Admin";
import { ModalBasic, ModalBoolean } from "../../components/Common";
import { useUser } from "../../hooks/useUser";

export function UsersAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [showModalBoolean, setShowModalBoolean] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [actionsButtons, setActionsButtons] = useState({});
  const [refetch, setRefetch] = useState(false);

  const {
    loading,
    error,
    users,
    getUsers,
    deleteUser,
    changeStatus,
    searchUsers,
  } = useUser();

  useEffect(() => {
    getUsers().catch((err) =>
      toast.error(
        err?.message || err?.detail || "Error al obtener los usuarios"
      )
    );
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseModalBoolean = () => setShowModalBoolean((prev) => !prev);
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
    setTitleModal("Eliminar Usuario");
    setContentModal(
      <div>
        <h1>¿Esta seguro de que desea eliminar al usuario {data?.username}?</h1>
      </div>
    );
    setActionsButtons({
      ok: {
        title: "Si, deseo eliminar",
        iconName: "checkmark",
        onClick: async () => {
          try {
            await deleteUser(data.id);
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

  const onChangeStatus = async (data) => {
    const auxText = data.is_active ? "Activar" : "Desactivar";
    setTitleModal(`${auxText} Usuario`);
    setContentModal(
      <div>
        <h1>
          ¿Estas seguro de que quieres {auxText} a {data.username}?
        </h1>
      </div>
    );
    setActionsButtons({
      ok: {
        title: `Si, deseo ${auxText}`,
        iconName: "checkmark",
        onClick: async () => {
          try {
            await changeStatus(data.id, data);
            onRefresh();
            openCloseModalBoolean();
            toast.success(data.is_active ? "Activado!" : "Desactivado!");
          } catch (err) {
            toast.success(`Error al ${auxText}!`);
          }
        },
      },
      cancel: {
        title: `No ${auxText}`,
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
        title="Usuarios"
        btnTitle="Nuevo Usuario"
        btnClick={addUser}
        options={[
          {
            input: {
              loading,
              className: "",
              icon: "search",
              title: "Buscar un usuario",
              onChange: (value) =>
                searchUsers(value).catch((err) =>
                  toast.error(
                    err?.message || err?.detail || "Error al buscar usuarios"
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
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
          onChangeStatus={onChangeStatus}
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
