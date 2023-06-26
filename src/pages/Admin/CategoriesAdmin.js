import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditCategoryForm,
  HeaderPage2,
  TableCategoryAdmin,
} from "../../components/Admin";
import { useCategory } from "../../hooks";
import { ModalBasic, ModalBoolean } from "../../components/Common";
import { toast } from "react-toastify";

export function CategoriesAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [showModalBoolean, setShowModalBoolean] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [actionsButtons, setActionsButtons] = useState({});
  const {
    loading,
    categories,
    getCategories,
    deleteCategory,
    searchCategories,
  } = useCategory();

  useEffect(() => {
    getCategories().catch((err) =>
      toast.error(
        err?.message || err?.detail || "Error al obtener las categorías"
      )
    );
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const openCloseModalBoolean = () => setShowModalBoolean((prev) => !prev);
  const onRefresh = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Nueva categoría");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefresh} />
    );
    openCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Actualizar categoría");
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefetch={onRefresh}
        category={data}
      />
    );
    openCloseModal();
  };

  const onDeleteCategory = async (data) => {
    setTitleModal("Eliminar Categoría");
    setContentModal(
      <div>
        <h1>¿Esta seguro de que desea eliminar la categoría {data?.title}?</h1>
      </div>
    );
    setActionsButtons({
      ok: {
        title: "Si, deseo eliminar",
        iconName: "checkmark",
        onClick: async () => {
          try {
            await deleteCategory(data.id);
            onRefresh();
            openCloseModalBoolean();
            toast.success("Eliminado!");
          } catch (err) {
            console.log(err);
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
        title="Categorias"
        btnTitle="Nueva Categoría"
        btnClick={addCategory}
        options={[
          {
            input: {
              loading,
              className: "",
              icon: "search",
              title: "Buscar una categoría",
              onChange: (value) =>
                searchCategories(value).catch((err) =>
                  toast.error(
                    err?.message ||
                      err?.detail ||
                      "Error al buscar las categorías"
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
        <TableCategoryAdmin
          categories={categories}
          updateCategory={updateCategory}
          onDeleteCategory={onDeleteCategory}
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
