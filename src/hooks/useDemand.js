import { useState } from "react";
import { getDemandPredictApi, getDemandPredictByMonthApi } from "../api/demand";
import { useAuth } from "./";

export function useDemand() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [demand, setDemand] = useState(null);
  const [predict, setPredict] = useState(null);
  const { auth } = useAuth();

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
    error,
    demand,
    predict,
    getDemandPredict,
    getDemandPredictByMonth,
  };
}
