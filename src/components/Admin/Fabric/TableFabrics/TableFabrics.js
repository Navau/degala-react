import React, { useState } from "react";
import { Table, Button, Icon, Pagination, Divider } from "semantic-ui-react";
import { map, size } from "lodash";

import "./TableFabrics.scss";
import { getCurrentPageData } from "../../../../utils/helpers";
import { PAGES_PER_DATA } from "../../../../utils/constants";

export function TableFabrics(props) {
  const { fabrics, updateFabric, onDeleteFabric } = props;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Table className="table-fabrics-admin" compact>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Nombre de Tela</Table.HeaderCell>
            <Table.HeaderCell>Precio</Table.HeaderCell>
            <Table.HeaderCell>Descripción</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(
            getCurrentPageData(fabrics, currentPage, PAGES_PER_DATA.fabrics),
            (item, index) => (
              <Table.Row key={index} className={!item.active && "no-active"}>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell className="status">
                  {item.active ? (
                    <>
                      <Icon name="check" /> Activo
                    </>
                  ) : (
                    <>
                      <Icon name="close" /> No Activo
                    </>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Actions
                    fabric={item}
                    updateFabric={updateFabric}
                    onDeleteFabric={onDeleteFabric}
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
          totalPages={Math.ceil(size(fabrics) / PAGES_PER_DATA.fabrics)}
        />
      </div>
    </>
  );
}

function Actions(props) {
  const { fabric, updateFabric, onDeleteFabric } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon primary onClick={() => updateFabric(fabric)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteFabric(fabric)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
