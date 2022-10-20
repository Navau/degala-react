import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./TableUsers.scss";

export function TableUsers(props) {
  const { users, updateUser, onDeleteUser } = props;

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
            <Table.Cell className="status">
              {item.is_active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Table.Cell className="status">
              {item.is_staff ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Table.Cell>
              <Actions
                user={item}
                updateUser={updateUser}
                onDeleteUser={onDeleteUser}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { user, updateUser, onDeleteUser } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateUser(user)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteUser(user)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
