import React, { useState } from "react";
import { getMeApi, getUsersApi } from "../api/user";
import { useAuth } from ".";

export function useUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const { auth } = useAuth();

  const getMe = async (token) => {
    try {
      const response = await getMeApi(token);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const getUsers = async (token) => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth.token);
      setLoading(false);

      setUsers(response);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  return { getMe, getUsers, loading, error, users };
}
