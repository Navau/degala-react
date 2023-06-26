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
import { useAuth } from "../../../../hooks";

import "./TableProductAdmin.scss";
import { getCurrentPageData } from "../../../../utils/helpers";
import { PAGES_PER_DATA } from "../../../../utils/constants";

export function TableProductAdmin(props) {
  const { products, updateProduct, onDeleteProduct } = props;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Table className="table-product-admin" compact>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Imagen</Table.HeaderCell>
            <Table.HeaderCell>Producto</Table.HeaderCell>
            <Table.HeaderCell>Precio</Table.HeaderCell>
            <Table.HeaderCell>Categoría</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell>Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(
            getCurrentPageData(products, currentPage, PAGES_PER_DATA.products),
            (item, index) => (
              <Table.Row key={index} className={!item.active && "no-active"}>
                <Table.Cell width={2}>
                  <Image src={item.image} />
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.price}Bs</Table.Cell>
                <Table.Cell>{item.category_data?.title}</Table.Cell>
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
                    product={item}
                    updateProduct={updateProduct}
                    onDeleteProduct={onDeleteProduct}
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
          totalPages={Math.ceil(size(products) / PAGES_PER_DATA.products)}
        />
      </div>
    </>
  );
}

function Actions(props) {
  const { product, updateProduct, onDeleteProduct } = props;
  const { auth } = useAuth();

  return (
    <Table.Cell textAlign="right">
      <Button icon primary onClick={() => updateProduct(product)}>
        <Icon name="pencil" />
      </Button>
      {auth.me.is_staff && (
        <Button icon negative onClick={() => onDeleteProduct(product)}>
          <Icon name="close" />
        </Button>
      )}
    </Table.Cell>
  );
}
