import React from "react";
import { Button } from "semantic-ui-react";
import { CSVLink } from "react-csv";

import "./HeaderPage2.scss";

export function HeaderPage2(props) {
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo, exportExcel } =
    props;
  return (
    <div className="header-page-admin">
      <h2>{title}</h2>

      <div>
        {btnTitle && (
          <Button positive onClick={btnClick}>
            {btnTitle}
          </Button>
        )}
        {btnTitleTwo && (
          <Button negative onClick={btnClickTwo}>
            {btnTitleTwo}
          </Button>
        )}
        {exportExcel && (
          <CSVLink
            data={exportExcel?.data}
            filename={"degala.csv"}
            target="_blank"
          >
            <Button positive>{exportExcel?.title}</Button>
          </CSVLink>
        )}
      </div>
    </div>
  );
}
