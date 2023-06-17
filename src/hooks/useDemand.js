import { useState } from "react";
import {
  getDemandByRangeDateApi,
  getDemandPredictApi,
  getDemandPredictByMonthApi,
  getDemandPredictByRangeDateApi,
} from "../api/demand";
import { useAuth } from "./";

export function useDemand() {
  const [loading, setLoading] = useState(true);
  const [loadingPredict, setLoadingPredict] = useState(true);
  const [error, setError] = useState(false);
  const [demand, setDemand] = useState([]);
  const [predict, setPredict] = useState(null);
  const { auth } = useAuth();

  const getDemandByRangeDate = async (fromDate, toDate) => {
    try {
      setLoading(true);
      const response = await getDemandByRangeDateApi(fromDate, toDate);
      setLoading(false);
      // setDemand(response);
      return response;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const getDemandPredictByRangeDate = async (fromDate, toDate) => {
    try {
      setLoading(true);
      const response = await getDemandPredictByRangeDateApi(fromDate, toDate);
      setLoading(false);
      // setDemand(response);
      return response;
    } catch (err) {
      setLoading(false);
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
    getDemandPredict,
    getDemandPredictByMonth,
    getDemandByRangeDate,
    getDemandPredictByRangeDate,
  };
}
