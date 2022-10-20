import React from "react";
import { Table, Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";

import "./TableCategoryAdmin.scss";

export function TableCategoryAdmin(props) {
  const { categories, updateCategory, onDeleteCategory } = props;
  return (
    <Table className="table-category-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Categoría</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(categories, (item, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={item.image} />
            </Table.Cell>
            <Table.Cell>{item.title}</Table.Cell>
            <Actions
              category={item}
              updateCategory={updateCategory}
              onDeleteCategory={onDeleteCategory}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { category, updateCategory, onDeleteCategory } = props;
  return (
    <Table.Cell>
      <Button icon onClick={() => updateCategory(category)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteCategory(category)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
