import { useState } from "react";
import {
  getCategoriesApi,
  addCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  searchCategoriesApi,
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
      throw err;
    }
  };

  const searchCategories = async (search) => {
    try {
      setLoading(true);
      const response = await searchCategoriesApi(search);
      setLoading(false);

      setCategories(response);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const addCategory = async (data) => {
    try {
      setLoading(true);
      const response = await addCategoryApi(data, auth.token);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const updateCategory = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateCategoryApi(id, data, auth.token);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const deleteCategory = async (id) => {
    try {
      setLoading(true);
      await deleteCategoryApi(id, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
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
    searchCategories,
  };
}
