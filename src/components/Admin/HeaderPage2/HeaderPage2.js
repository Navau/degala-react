import React from "react";
import { Button, Divider, Grid, Header, Input } from "semantic-ui-react";
import { CSVLink } from "react-csv";

import "./HeaderPage2.scss";
import { isUndefined, map, size } from "lodash";

export function HeaderPage2(props) {
  const {
    title,
    btnTitle,
    btnClick,
    btnTitleTwo,
    btnClickTwo,
    exportExcel,
    options = [],
  } = props;
  return (
    <Grid className="header-page-admin">
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as="h2">{title}</Header>
        </Grid.Column>
        <Grid.Column width={8} textAlign="right">
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
        </Grid.Column>
      </Grid.Row>
      {size(options) > 0 && (
        <>
          <Divider />
          {map(options, (option, index) => (
            <Grid.Row key={index}>
              {!isUndefined(option?.input) && (
                <Grid.Column width={8} textAlign="left">
                  <Input
                    className={option.input.className}
                    loading={option.input.loading}
                    icon={option.input.icon}
                    iconPosition="left"
                    placeholder={option.input.title}
                    onChange={(e, data) => option.input.onChange(data.value)}
                  />
                </Grid.Column>
              )}
              {!isUndefined(option?.button) && (
                <Grid.Column width={8} textAlign="right">
                  <Button
                    className={option.button.className}
                    loading={option.button.loading}
                    icon={option.button.icon}
                    content={option.button.title}
                    onClick={() => option.button.onClick()}
                  />
                </Grid.Column>
              )}
            </Grid.Row>
          ))}
        </>
      )}
    </Grid>
  );
}
