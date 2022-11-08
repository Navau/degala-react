import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./TableFabrics.scss";

export function TableFabrics(props) {
  const { fabrics, updateFabric, onDeleteFabric } = props;

  return (
    <Table className="table-fabrics-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Nombre de Tela</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Descripción</Table.HeaderCell>
          <Table.HeaderCell>Estado</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(fabrics, (item, index) => (
          <Table.Row key={index}>
            <Table.Cell>{item.title}</Table.Cell>
            <Table.Cell>{item.price}</Table.Cell>
            <Table.Cell>{item.description}</Table.Cell>
            <Table.Cell className="status">
              {item.active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Table.Cell>
              <Actions
                fabric={item}
                updateFabric={updateFabric}
                onDeleteFabric={onDeleteFabric}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
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
