import React, { useState } from "react";
import {
  getMeApi,
  getUsersApi,
  addUserApi,
  updateUserApi,
  deleteUserApi,
  changeStatusApi,
  searchUsersApi,
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
      throw err;
    }
  };

  const searchUsers = async (search) => {
    try {
      setLoading(true);
      const response = await searchUsersApi(search, auth.token);
      setLoading(false);

      setUsers(response);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const addUser = async (data) => {
    try {
      setLoading(true);
      await addUserApi(data, auth.token);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      await updateUserApi(id, data, auth.token);
      setLoading(false);
    } catch (err) {
      throw err;
    }
  };

  const changeStatus = async (id, data) => {
    try {
      setLoading(true);
      const response = await changeStatusApi(id, data, auth.token);
      setLoading(false);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await deleteUserApi(id, auth.token);
      setLoading(false);
    } catch (err) {
      throw err;
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
    changeStatus,
    searchUsers,
  };
}
