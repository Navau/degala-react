import { useState } from "react";
import { getAllDatasetApi, getDatasetByRangeDateApi } from "../api/dataset";
import { useAuth } from "./";

export function useDataset() {
  const [loadingDataset, setLoadingDataset] = useState(false);
  const [error, setError] = useState(false);
  const [dataset, setDataset] = useState([]);
  const [allDataset, setAllDataset] = useState([]);
  const { auth } = useAuth();

  const getAllDataset = async () => {
    try {
      setLoadingDataset(true);
      const response = await getAllDatasetApi();
      setLoadingDataset(false);
      setAllDataset(response);
    } catch (err) {
      setLoadingDataset(false);
      throw err;
    }
  };

  const getDatasetByRangeDate = async (fromDate, toDate) => {
    try {
      setLoadingDataset(true);
      const response = await getDatasetByRangeDateApi(fromDate, toDate);
      setLoadingDataset(false);
      setDataset(response);
      return response;
    } catch (err) {
      setLoadingDataset(false);
      throw err;
    }
  };

  return {
    loadingDataset,
    error,
    dataset,
    allDataset,
    getAllDataset,
    getDatasetByRangeDate,
    setDataset,
  };
}
