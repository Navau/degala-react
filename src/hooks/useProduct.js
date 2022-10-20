import { useState } from "react";
import {
  addProductApi,
  deleteProductApi,
  getProductByIdApi,
  getProductsApi,
  updateProductApi,
} from "../api/product";
import { useAuth } from "./useAuth";

export function useProduct() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState(null);
  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setLoading(false);

      setProducts(response);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      await addProductApi(data, auth.token);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      setLoading(true);
      await updateProductApi(id, data, auth.token);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProductApi(id, auth.token);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      setLoading(true);
      const response = await getProductByIdApi(id);
      setLoading(false);

      return response;
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    loading,
    error,
    products,
  };
}
