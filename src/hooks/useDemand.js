import { useState } from "react";
import {
  getAllDemandApi,
  getDemandByRangeDateApi,
  getDemandPredictApi,
  getDemandPredictByMonthApi,
  getDemandPredictByRangeDateApi,
} from "../api/demand";
import { useAuth } from "./";

export function useDemand() {
  const [loading, setLoading] = useState(true);
  const [loadingDemand, setLoadingDemand] = useState(false);
  const [loadingPredict, setLoadingPredict] = useState(true);
  const [error, setError] = useState(false);
  const [demand, setDemand] = useState([]);
  const [allDemand, setAllDemand] = useState([]);
  const [predict, setPredict] = useState(null);
  const { auth } = useAuth();

  const getAllDemand = async () => {
    try {
      setLoading(true);
      const response = await getAllDemandApi(auth.token);
      setLoading(false);
      setAllDemand(response);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const getDemandByRangeDate = async (fromDate, toDate) => {
    try {
      setLoading(true);
      const response = await getDemandByRangeDateApi(
        fromDate,
        toDate,
        auth.token
      );
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const getDemandPredictByRangeDate = async (fromDate, toDate) => {
    try {
      setLoadingDemand(true);
      const response = await getDemandPredictByRangeDateApi(
        fromDate,
        toDate,
        auth.token
      );
      setLoadingDemand(false);
      // setDemand(response);
      return response;
    } catch (err) {
      setLoadingDemand(false);
      throw err;
    }
  };

  const getDemandPredict = async () => {
    try {
      setLoading(true);
      const response = await getDemandPredictApi(auth.token);
      setLoading(false);
      setDemand(response);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getDemandPredictByMonth = async (month) => {
    try {
      setLoading(true);
      const response = await getDemandPredictByMonthApi(month, auth.token);
      setLoading(false);
      setPredict(response);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    loading,
    loadingPredict,
    error,
    demand,
    predict,
    allDemand,
    getDemandPredict,
    getDemandPredictByMonth,
    getDemandByRangeDate,
    getDemandPredictByRangeDate,
    getAllDemand,
    loadingDemand,
  };
}
