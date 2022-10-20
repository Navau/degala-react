import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  AddEditCategoryForm,
  HeaderPage2,
  TableCategoryAdmin,
} from "../../components/Admin";
import { useCategory } from "../../hooks";
import { ModalBasic } from "../../components/Common";

export function CategoriesAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, categories, getCategories, deleteCategory } = useCategory();

  useEffect(() => {
    getCategories();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const onRefetch = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Nueva categoría");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Actualizar categoría");
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={data}
      />
    );
    openCloseModal();
  };

  const onDeleteCategory = async (data) => {
    const result = window.confirm(
      `¿Estas seguro de que quieres eliminar a ${data.title}?`
    );
    if (result) {
      try {
        await deleteCategory(data.id);
        onRefetch();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <HeaderPage2
        title="Categorias"
        btnTitle="Nueva Categoría"
        btnClick={addCategory}
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
    </>
  );
}
