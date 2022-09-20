import React from "react";
import { Button } from "semantic-ui-react";
import { CSVLink } from "react-csv";

import "./HeaderExportPage.scss";

export function HeaderExportPage(props) {
  const { generateDate, dataset } = props;
  // console.log(dataset);
  return (
    <div className="header-export-page-admin">
      {dataset && (
        <CSVLink data={dataset} filename={"dataset-degala.csv"} target="_blank">
          Convertir a Excel
        </CSVLink>
      )}

      <Button primary onClick={generateDate}>
        Generar Data
      </Button>
    </div>
  );
}
