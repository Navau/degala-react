import React from "react";
import { Table, Image, Button, Icon, TableCell } from "semantic-ui-react";
import { map } from "lodash";

import "./TableProductAdmin.scss";
import { useAuth } from "../../../../hooks";

export function TableProductAdmin(props) {
  const { products, updateProduct, onDeleteProduct } = props;

  return (
    <Table className="table-product-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Producto</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Categoría</Table.HeaderCell>
          <Table.HeaderCell>Estado</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(products, (item, index) => (
          <Table.Row key={index} className={!item.active && "no-active"}>
            <Table.Cell width={2}>
              <Image src={item.image} />
            </Table.Cell>
            <Table.Cell>{item.title}</Table.Cell>
            <Table.Cell>{item.price}Bs</Table.Cell>
            <Table.Cell>{item.category_data.title}</Table.Cell>
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
        ))}
      </Table.Body>
    </Table>
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
