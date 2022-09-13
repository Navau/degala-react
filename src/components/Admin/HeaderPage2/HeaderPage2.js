import React from "react";
import { Button } from "semantic-ui-react";

import "./HeaderPage2.scss";

export function HeaderPage2(props) {
  const { title, btnTitle, btnClick, btnTitleTwo, btnClickTwo } = props;
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
      </div>
    </div>
  );
}
