import React, { useState } from "react";
import {
  Table,
  Button,
  Icon,
  Checkbox,
  Pagination,
  Container,
  Divider,
} from "semantic-ui-react";
import { map, size } from "lodash";
import { getCurrentPageData } from "../../../../utils/helpers";
import { PAGES_PER_DATA } from "../../../../utils/constants";

import "./TableUsers.scss";

export function TableUsers(props) {
  const { users, updateUser, onDeleteUser, onChangeStatus } = props;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Table className="table-users-admin" compact>
        <Table.Header>
          <Table.Row textAlign="center">
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
          {map(
            getCurrentPageData(users, currentPage, PAGES_PER_DATA.users),
            (item, index) => (
              <Table.Row key={index} error={!item.is_active}>
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
                <Table.Cell singleLine textAlign="center">
                  <Actions
                    user={item}
                    updateUser={updateUser}
                    onDeleteUser={onDeleteUser}
                    onChangeStatus={onChangeStatus}
                  />
                </Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
      <Divider />
      <div className="pagination-admin">
        <Pagination
          defaultActivePage={1}
          onPageChange={(e, data) => setCurrentPage(data?.activePage)}
          ellipsisItem={{
            content: <Icon name="ellipsis horizontal" />,
            icon: true,
          }}
          firstItem={{
            content: <Icon name="angle double left" />,
            icon: true,
          }}
          lastItem={{
            content: <Icon name="angle double right" />,
            icon: true,
          }}
          prevItem={{ content: <Icon name="angle left" />, icon: true }}
          nextItem={{ content: <Icon name="angle right" />, icon: true }}
          totalPages={Math.ceil(size(users) / PAGES_PER_DATA.users)}
        />
      </div>
    </>
  );
}

function Actions(props) {
  const { user, updateUser, onDeleteUser, onChangeStatus } = props;
  return (
    <>
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
                <Icon name="thumbs down outline" /> Desactivar
              </>
            ) : (
              <>
                <Icon name="thumbs up outline" /> Activar
              </>
            )}
          </Button>
        </>
      )}
    </>
  );
}
