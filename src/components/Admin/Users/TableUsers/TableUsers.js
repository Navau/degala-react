import React from "react";
import { Table, Button, Icon, Checkbox } from "semantic-ui-react";
import { map } from "lodash";

import "./TableUsers.scss";

export function TableUsers(props) {
  const { users, updateUser, onDeleteUser, onChangeStatus } = props;

  return (
    <Table className="table-users-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Carnet de identidad</Table.HeaderCell>
          <Table.HeaderCell>Nombre de usuario</Table.HeaderCell>
          <Table.HeaderCell>Correo Electrónico</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Estado</Table.HeaderCell>
          <Table.HeaderCell>Rol</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(users, (item, index) => (
          <Table.Row key={index}>
            <Table.Cell>{item.ci}</Table.Cell>
            <Table.Cell>{item.username}</Table.Cell>
            <Table.Cell>{item.email}</Table.Cell>
            <Table.Cell>
              {item.first_name} {item.last_name}
            </Table.Cell>
            <Table.Cell className="status">
              {item.is_active ? (
                <>
                  <Icon name="check" /> Activo
                </>
              ) : (
                <>
                  <Icon name="close" /> No Activo
                </>
              )}
            </Table.Cell>
            <Table.Cell className="status">
              {item.is_staff ? "Gerente" : "Empleado"}
            </Table.Cell>
            <Table.Cell singleLine>
              <Actions
                user={item}
                updateUser={updateUser}
                onDeleteUser={onDeleteUser}
                onChangeStatus={onChangeStatus}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { user, updateUser, onDeleteUser, onChangeStatus } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon primary onClick={() => updateUser(user)}>
        <Icon name="pencil" />
      </Button>
      {!user.is_staff && (
        <>
          <Button icon negative onClick={() => onDeleteUser(user)}>
            <Icon name="close" />
          </Button>
          <Button
            icon
            secondary
            onClick={() =>
              onChangeStatus({ ...user, is_active: !user.is_active })
            }
          >
            {user.is_active ? (
              <>
                <Icon name="thumbs up outline" />
              </>
            ) : (
              <>
                <Icon name="thumbs down outline" />
              </>
            )}
          </Button>
        </>
      )}
    </Table.Cell>
  );
}
