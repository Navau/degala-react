import { useState } from "react";
import {
  addSale2Api,
  deleteSale2Api,
  getSale2ByIdApi,
  getSales2Api,
  searchSales2Api,
  updateSale2Api,
} from "../api/sales2";
import { useAuth } from "./useAuth";

export function useSale2() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sales2, setSales2] = useState(null);
  const { auth } = useAuth();

  const getSales2 = async () => {
    try {
      setLoading(true);
      const response = await getSales2Api();
      setLoading(false);

      setSales2(response);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const searchSales2 = async (search) => {
    try {
      setLoading(true);
      const response = await searchSales2Api(search);
      setLoading(false);

      setSales2(response);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const addSale2 = async (data) => {
    try {
      setLoading(true);
      const response = await addSale2Api(data, auth.token);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const updateSale2 = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateSale2Api(id, data, auth.token);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const deleteSale2 = async (id) => {
    try {
      setLoading(true);
      await deleteSale2Api(id, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const getSale2ById = async (id) => {
    try {
      setLoading(true);
      const response = await getSale2ByIdApi(id);
      setLoading(false);

      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return {
    getSales2,
    addSale2,
    updateSale2,
    deleteSale2,
    getSale2ById,
    loading,
    error,
    sales2,
    searchSales2,
  };
}
