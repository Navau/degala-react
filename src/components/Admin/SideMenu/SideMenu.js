import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

import "./SideMenu.scss";

export function SideMenu(props) {
  const { children } = props;
  const { pathname } = useLocation();

  return (
    <div className="side-menu-admin">
      <MenuLeft pathname={pathname} />
      <div className="content">{children}</div>
    </div>
  );
}

function MenuLeft(props) {
  const { pathname } = props;
  const { auth } = useAuth();

  return (
    <Menu fixed="left" borderless className="side" vertical>
      <Menu.Item as={Link} to={"/admin"} active={pathname === "/admin"}>
        <Icon name="home" /> Inventarios
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={"/admin/products"}
        active={pathname === "/admin/products"}
      >
        <Icon name="cart" /> Productos
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={"/admin/categories"}
        active={pathname === "/admin/categories"}
      >
        <Icon name="folder" /> Categorias
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={"/admin/demand"}
        active={pathname === "/admin/demand"}
      >
        <Icon name="history" /> Demanda
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={"/admin/statistics"}
        active={pathname === "/admin/statistics"}
      >
        <Icon name="area graph" /> Estadisticas
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={"/admin/reports"}
        active={pathname === "/admin/reports"}
      >
        <Icon name="newspaper" /> Reportes
      </Menu.Item>
      {auth.me?.is_staff && (
        <Menu.Item
          as={Link}
          to={"/admin/users"}
          active={pathname === "/admin/users"}
        >
          <Icon name="users" /> Usuarios
        </Menu.Item>
      )}
    </Menu>
  );
}
