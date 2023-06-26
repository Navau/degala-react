import React, { useState } from "react";
import {
  Table,
  Image,
  Button,
  Icon,
  TableCell,
  Divider,
  Pagination,
} from "semantic-ui-react";
import { map, size } from "lodash";

import "./TableSale2Admin.scss";
import { useAuth } from "../../../../hooks";
import dayjs from "dayjs";
import { getCurrentPageData } from "../../../../utils/helpers";
import { PAGES_PER_DATA } from "../../../../utils/constants";
require("dayjs/locale/es");

export function TableSale2Admin(props) {
  const { sales2, updateSale2, onDeleteSale2 } = props;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Table className="table-sale2-admin" compact>
        <Table.Header>
          <Table.Row textAlign="center">
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
          {map(
            getCurrentPageData(sales2, currentPage, PAGES_PER_DATA.sales),
            (item, index) => (
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
                <Table.Cell textAlign="right">
                  <Actions
                    sale2={item}
                    updateSale2={updateSale2}
                    onDeleteSale2={onDeleteSale2}
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
          totalPages={Math.ceil(size(sales2) / PAGES_PER_DATA.sales)}
        />
      </div>
    </>
  );
}

function Actions(props) {
  const { sale2, updateSale2, onDeleteSale2 } = props;
  const { auth } = useAuth();

  return (
    <>
      <Button icon primary onClick={() => updateSale2(sale2)}>
        <Icon name="pencil" />
      </Button>
      {auth.me.is_staff && (
        <Button icon negative onClick={() => onDeleteSale2(sale2)}>
          <Icon name="close" />
        </Button>
      )}
    </>
  );
}
