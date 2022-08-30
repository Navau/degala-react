import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage2, TableUsers } from "../../components/Admin";
import { useUser } from "../../hooks/useUser";

export function UsersAdmin() {
  const { loading, error, users, getUsers } = useUser();
  console.log(loading);
  console.log(users);
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <HeaderPage2 title="Usuarios" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers users={users} />
      )}
    </>
  );
}
