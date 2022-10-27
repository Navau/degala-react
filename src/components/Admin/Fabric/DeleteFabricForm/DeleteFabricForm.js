import React, { useEffect } from "react";
import { useFabric } from "../../../../hooks";

import "./DeleteFabricForm.scss";

export function DeleteFabricForm(props) {
  const { fabric } = props;
  return (
    <div>
      <h1>¿Esta seguro de que desea eliminar la tela {fabric?.title}?</h1>
    </div>
  );
}
