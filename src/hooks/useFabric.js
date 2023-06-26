import { useState } from "react";
import {
  addFabricApi,
  deleteFabricApi,
  getFabricsApi,
  searchFabricsApi,
  updateFabricApi,
} from "../api/fabric";
import { useAuth } from "./";

export function useFabric() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fabrics, setFabrics] = useState(null);
  const { auth } = useAuth();

  const getFabrics = async () => {
    try {
      setLoading(true);
      const response = await getFabricsApi(auth.token);
      setLoading(false);

      setFabrics(response);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const searchFabrics = async (search) => {
    try {
      setLoading(true);
      const response = await searchFabricsApi(search);
      setLoading(false);

      setFabrics(response);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const addFabric = async (data) => {
    try {
      setLoading(true);
      await addFabricApi(data, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const updateFabric = async (id, data) => {
    try {
      setLoading(true);
      await updateFabricApi(id, data, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const deleteFabric = async (id) => {
    try {
      setLoading(true);
      await deleteFabricApi(id, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return {
    getFabrics,
    searchFabrics,
    addFabric,
    updateFabric,
    deleteFabric,
    fabrics,
    loading,
    error,
  };
}
