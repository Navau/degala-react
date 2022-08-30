import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./TableUsers.scss";

export function TableUsers(props) {
  const { users } = props;
  return (
    <Table className="table-users-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Apellidos</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell>Staff</Table.HeaderCell>
          <Table.HeaderCell>Accion</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(users, (item, index) => (
          <Table.Row key={index}>
            <Table.Cell>{item.username}</Table.Cell>
            <Table.Cell>{item.email}</Table.Cell>
            <Table.Cell>{item.first_name}</Table.Cell>
            <Table.Cell>{item.last_name}</Table.Cell>
            <Table.Cell>0 - Active</Table.Cell>
            <Table.Cell>0 - Staff</Table.Cell>
            <Table.Cell>0 - Actions</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
