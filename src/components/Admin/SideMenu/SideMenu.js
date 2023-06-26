import React from "react";
import { Menu, Icon, Image } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import Logo from "../../../assets/img/logo.png";

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
    <Menu fixed="left" borderless className="side-menu-admin" vertical>
      <Menu.Item
        as={Link}
        to={"/"}
        active={pathname === "/"}
        className="side-menu-admin__logo"
      >
        <Image src={Logo} />
      </Menu.Item>
      {/* <Menu.Item as={Link} to={"/"} active={pathname === "/"}>
        <Icon name="home" /> Inventarios
      </Menu.Item> */}
      <Menu.Item as={Link} to={"/sales2"} active={pathname === "/sales2"}>
        <Icon name="dollar sign" /> Ventas
      </Menu.Item>
      <Menu.Item as={Link} to={"/products"} active={pathname === "/products"}>
        <Icon name="cart" /> Productos
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={"/categories"}
        active={pathname === "/categories"}
      >
        <Icon name="folder" /> Categorias
      </Menu.Item>
      <Menu.Item as={Link} to={"/fabrics"} active={pathname === "/fabrics"}>
        <Icon name="thumb tack" /> Telas
      </Menu.Item>

      {/* <Menu.Item
        as={Link}
        to={"/statistics"}
        active={pathname === "/statistics"}
      >
        <Icon name="area graph" /> Estadisticas
      </Menu.Item>
      <Menu.Item as={Link} to={"/reports"} active={pathname === "/reports"}>
        <Icon name="newspaper" /> Reportes
      </Menu.Item> */}
      {auth.me?.is_staff && (
        <>
          <Menu.Item as={Link} to={"/demand"} active={pathname === "/demand"}>
            <Icon name="history" /> Demanda
          </Menu.Item>
          <Menu.Item as={Link} to={"/users"} active={pathname === "/users"}>
            <Icon name="users" /> Usuarios
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}
