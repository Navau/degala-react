import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { map } from "lodash";
import routes from "./routes";

// import "./navigation.scss";

export function Navigation() {
  return (
    <Router>
      <Routes>
        {map(routes, (item, index) => (
          <Route
            key={index}
            path={item.path}
            element={
              <item.layout>
                <item.component />
              </item.layout>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}
