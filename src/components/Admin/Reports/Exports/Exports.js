import React from "react";
import { Table } from "semantic-ui-react";
import { map } from "lodash";

import "./Exports.scss";

export function Exports(props) {
  const { dataset } = props;

  return (
    <div className="exports-admin">
      <Table className="exports-admin__data">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>FECHA</Table.HeaderCell>
            <Table.HeaderCell>PRODUCTO</Table.HeaderCell>
            <Table.HeaderCell>PRECIO</Table.HeaderCell>
            {/* <Table.HeaderCell>AUX1</Table.HeaderCell>
            <Table.HeaderCell>AUX2</Table.HeaderCell>
            <Table.HeaderCell>AUX3</Table.HeaderCell>
            <Table.HeaderCell>AUX4</Table.HeaderCell>
            <Table.HeaderCell>AUX5</Table.HeaderCell>
            <Table.HeaderCell>AUX6</Table.HeaderCell> */}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(dataset, (item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>{item.product}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              {/* <Table.Cell>{item.aux}</Table.Cell>
              <Table.Cell>{item.aux2}</Table.Cell>
              <Table.Cell>{item.aux3}</Table.Cell>
              <Table.Cell>{item.aux4}</Table.Cell>
              <Table.Cell>{item.aux5}</Table.Cell>
              <Table.Cell>{item.aux6}</Table.Cell> */}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
