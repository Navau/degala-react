import { useState } from "react";
import {
  addProductApi,
  deleteProductApi,
  getProductByIdApi,
  getProductsApi,
  getProductsByCategoryIDApi,
  searchProductsApi,
  updateProductApi,
  updateProductStockApi,
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
      setLoading(false);
      throw err;
    }
  };

  const searchProducts = async (search) => {
    try {
      setLoading(true);
      const response = await searchProductsApi(search);
      setLoading(false);

      setProducts(response);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const getProductsByCategoryID = async (id) => {
    try {
      setLoading(true);
      const response = await getProductsByCategoryIDApi(id);
      setLoading(false);

      setProducts(response);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const addProduct = async (data) => {
    try {
      setLoading(true);
      const response = await addProductApi(data, auth.token);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const updateProduct = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateProductApi(id, data, auth.token);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const updateProductStock = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateProductStockApi(id, data, auth.token);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProductApi(id, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
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
      throw err;
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
    getProductsByCategoryID,
    updateProductStock,
    searchProducts,
  };
}
