import React, { useState } from "react";
import {
  getMeApi,
  getUsersApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
} from "../api/user";
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

  const getUsers = async () => {
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

  const addUser = async (data) => {
    try {
      setLoading(true);
      await addUserApi(data, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      await updateUserApi(id, data, auth.token);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await deleteUserApi(id, auth.token);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getMe,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    loading,
    error,
    users,
  };
}
