import React from "react";
import { Divider, Image, Loader } from "semantic-ui-react";
import Logo from "../../../assets/img/logo.png";

import "./LoaderAuth.scss";

export function LoaderAuth() {
  return (
    <div className="loader-auth">
      <Image src={Logo} size="large" circular />
      <Divider />
      <Loader active size="massive" inline className="loader-auth__loader">
        Cargando información de DeGala
      </Loader>
    </div>
  );
}
