import React from "react";
import { Table, Image, Button, Icon, TableCell } from "semantic-ui-react";
import { map } from "lodash";

import "./TableProductAdmin.scss";

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
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(products, (item, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={item.image} />
            </Table.Cell>
            <Table.Cell>{item.title}</Table.Cell>
            <Table.Cell>{item.price}Bs</Table.Cell>
            <Table.Cell>{item.category_data.title}</Table.Cell>
            <Table.Cell>
              {item.active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Actions
              product={item}
              updateProduct={updateProduct}
              onDeleteProduct={onDeleteProduct}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { product, updateProduct, onDeleteProduct } = props;

  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateProduct(product)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteProduct(product)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
