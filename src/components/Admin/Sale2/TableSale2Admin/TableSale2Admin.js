import React from "react";
import { Table, Image, Button, Icon, TableCell } from "semantic-ui-react";
import { map } from "lodash";

import "./TableSale2Admin.scss";
import { useAuth } from "../../../../hooks";
import dayjs from "dayjs";
require("dayjs/locale/es");

export function TableSale2Admin(props) {
  const { sales2, updateSale2, onDeleteSale2 } = props;
  console.log(sales2);

  return (
    <Table className="table-sale2-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Fecha de venta</Table.HeaderCell>
          <Table.HeaderCell>Cantidad</Table.HeaderCell>
          <Table.HeaderCell>Pago</Table.HeaderCell>
          <Table.HeaderCell>Cambio</Table.HeaderCell>
          <Table.HeaderCell>Producto</Table.HeaderCell>
          <Table.HeaderCell>Usuario</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(sales2, (item, index) => (
          <Table.Row key={index} className={!item.active && "no-active"}>
            <Table.Cell>
              {dayjs(item.created_at)
                .locale("es-MX")
                .format("DD-MMM-YY [a las:] HH:mm:ss")}
            </Table.Cell>
            <Table.Cell>{item.quantity} U.</Table.Cell>
            <Table.Cell>{item.payment} Bs</Table.Cell>
            <Table.Cell>{item.change} Bs</Table.Cell>
            <Table.Cell>{item.product_data.title}</Table.Cell>
            <Table.Cell>
              {item.user_data.first_name} {item.user_data.last_name}
            </Table.Cell>
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
                sale2={item}
                updateSale2={updateSale2}
                onDeleteSale2={onDeleteSale2}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { sale2, updateSale2, onDeleteSale2 } = props;
  const { auth } = useAuth();

  return (
    <Table.Cell textAlign="right">
      <Button icon primary onClick={() => updateSale2(sale2)}>
        <Icon name="pencil" />
      </Button>
      {auth.me.is_staff && (
        <Button icon negative onClick={() => onDeleteSale2(sale2)}>
          <Icon name="close" />
        </Button>
      )}
    </Table.Cell>
  );
}
