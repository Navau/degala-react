// import React from "react";
// import { Table, Image, Button, Icon, TableCell } from "semantic-ui-react";
// import { map } from "lodash";

// import "./TableSaleAdmin.scss";

// export function TableSaleAdmin(props) {
//   const { sales, updateSale, onDeleteSale } = props;

//   return (
//     <Table className="table-sale-admin">
//       <Table.Header>
//         <Table.Row>
//           <Table.HeaderCell>Fecha de Venta</Table.HeaderCell>
//           <Table.HeaderCell>Total Original de la Venta (Bs)</Table.HeaderCell>
//           <Table.HeaderCell>Descuento Total (Bs)</Table.HeaderCell>
//           <Table.HeaderCell>Total Final de la Venta (Bs)</Table.HeaderCell>
//           <Table.HeaderCell>Cantidad Vendida Total</Table.HeaderCell>
//           <Table.HeaderCell>Usuario o Vendedor</Table.HeaderCell>
//           <Table.HeaderCell>Estado</Table.HeaderCell>
//           <Table.HeaderCell textAlign="center">Acciones</Table.HeaderCell>
//         </Table.Row>
//       </Table.Header>
//       <Table.Body>
//         {map(sales, (item, index) => (
//           <Table.Row key={index}>
//             <Table.Cell>{item.created_at}</Table.Cell>
//             <Table.Cell>
//               {(
//                 parseFloat(item.totalSale) + parseFloat(item.totalDiscount)
//               ).toFixed(2)}{" "}
//               Bs
//             </Table.Cell>
//             <Table.Cell>{item.totalDiscount} Bs</Table.Cell>
//             <Table.Cell>{item.totalSale} Bs</Table.Cell>
//             <Table.Cell>{item.totalQuantity} Unidades</Table.Cell>
//             <Table.Cell>
//               {item.user_data.ci
//                 ? item.user_data.ci
//                 : item.user_data.username
//                 ? item.user_data.username
//                 : item.user_data.email}
//             </Table.Cell>
//             <Table.Cell>
//               {item.statusSale ? <Icon name="check" /> : <Icon name="close" />}
//             </Table.Cell>
//             <Actions
//               sale={item}
//               updateSale={updateSale}
//               onDeleteSale={onDeleteSale}
//             />
//           </Table.Row>
//         ))}
//       </Table.Body>
//     </Table>
//   );
// }

// function Actions(props) {
//   const { sale, updateSale, onDeleteSale } = props;

//   return (
//     <Table.Cell textAlign="right">
//       <Button.Group>
//         <Button icon primary onClick={() => updateSale(sale)}>
//           <Icon name="pencil" />
//         </Button>
//         <Button.Or text={"o"} />
//         <Button icon negative onClick={() => onDeleteSale(sale)}>
//           <Icon name="close" />
//         </Button>
//         <Button.Or text={"o"} />
//         <Button icon secondary onClick={() => console.log("DETALLE VENTA")}>
//           <Icon name="clipboard list" />
//         </Button>
//       </Button.Group>
//     </Table.Cell>
//   );
// }
