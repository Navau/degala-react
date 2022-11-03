import React from "react";
import { Table, Image, Button, Icon, TableCell } from "semantic-ui-react";
import { map } from "lodash";

import "./TableReportAdmin.scss";

export function TableReportAdmin(props) {
  const { reports, type } = props;

  return (
    <Table className="table-product-admin">
      <Table.Header>
        {type === "control" ? (
          <Table.Row>
            <Table.HeaderCell>Imagen</Table.HeaderCell>
            <Table.HeaderCell>Producto</Table.HeaderCell>
            <Table.HeaderCell>Stock Disponible</Table.HeaderCell>
            <Table.HeaderCell>Color</Table.HeaderCell>
            <Table.HeaderCell>Fecha de Ingreso</Table.HeaderCell>
            <Table.HeaderCell>Categoria</Table.HeaderCell>
          </Table.Row>
        ) : type === "movement" ? (
          <Table.Row>
            <Table.HeaderCell>Producto</Table.HeaderCell>
            <Table.HeaderCell>Fecha Venta</Table.HeaderCell>
            <Table.HeaderCell>Precio</Table.HeaderCell>
            <Table.HeaderCell>Stock Vendido</Table.HeaderCell>
          </Table.Row>
        ) : null}
      </Table.Header>
      <Table.Body>
        {type === "control"
          ? map(reports, (item, index) => (
              <Table.Row key={index}>
                <Table.Cell width={2}>
                  <Image src={item.image} />
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.stock}Bs</Table.Cell>
                <Table.Cell>{item.color}Bs</Table.Cell>
                <Table.Cell>{item.created_at}Bs</Table.Cell>
                <Table.Cell>{item.category_data.title}</Table.Cell>
              </Table.Row>
            ))
          : type === "movement"
          ? map(reports, (item, index) => (
              <Table.Row key={index}>
                <Table.Cell width={2}>
                  <Image src={item.image} />
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.sold_at}</Table.Cell>
                <Table.Cell>{item.price}Bs</Table.Cell>
                <Table.Cell>{item.stock}Bs</Table.Cell>
              </Table.Row>
            ))
          : null}
      </Table.Body>
    </Table>
  );
}
