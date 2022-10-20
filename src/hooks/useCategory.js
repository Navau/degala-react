import { useState } from "react";
import {
  getCategoriesApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from "../api/category";
import { useAuth } from "./";

export function useCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState(null);
  const { auth } = useAuth();

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriesApi();
      setLoading(false);

      setCategories(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const addCategory = async (data) => {
    try {
      setLoading(true);
      await addCategoryApi(data, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const updateCategory = async (id, data) => {
    try {
      setLoading(true);
      await updateCategoryApi(id, data, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      await deleteCategoryApi(id, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    loading,
    error,
    categories,
  };
}
