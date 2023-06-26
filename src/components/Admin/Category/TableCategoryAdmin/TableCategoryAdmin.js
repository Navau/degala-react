import React, { useState } from "react";
import {
  Table,
  Image,
  Button,
  Icon,
  Pagination,
  Divider,
} from "semantic-ui-react";
import { map, size } from "lodash";

import "./TableCategoryAdmin.scss";
import { PAGES_PER_DATA } from "../../../../utils/constants";
import { getCurrentPageData } from "../../../../utils/helpers";

export function TableCategoryAdmin(props) {
  const { categories, updateCategory, onDeleteCategory } = props;
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <Table celled className="table-category-admin" compact>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Imagen</Table.HeaderCell>
            <Table.HeaderCell>Categoría</Table.HeaderCell>
            <Table.HeaderCell>Estado</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Acciones</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(
            getCurrentPageData(
              categories,
              currentPage,
              PAGES_PER_DATA.categories
            ),
            (item, index) => (
              <Table.Row key={index} className={!item.active && "no-active"}>
                <Table.Cell width={2}>
                  <Image src={item.image} />
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
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
                    category={item}
                    updateCategory={updateCategory}
                    onDeleteCategory={onDeleteCategory}
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
          totalPages={Math.ceil(size(categories) / PAGES_PER_DATA.categories)}
        />
      </div>
    </>
  );
}

function Actions(props) {
  const { category, updateCategory, onDeleteCategory } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon primary onClick={() => updateCategory(category)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteCategory(category)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
