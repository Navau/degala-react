import React, { useState } from "react";
import { map } from "lodash";
import {
  Exports,
  HeaderExportPage,
  TableReportAdmin,
} from "../../../components/Admin/Reports";
import { ModalBasic } from "../../../components/Common";
import { HeaderPage2 } from "../../../components/Admin";
import { Document, Page } from "react-pdf";

import "./ReportsAdmin.scss";

//#region Reportes
export function ReportsAdmin() {
  const [dataset, setDataset] = useState([]);
  //   "1": {
  //     percentage: 1,
  //   },
  //   "2": {
  //     percentage: 1,
  //   },
  //   "3": {
  //     percentage: 1,
  //   },
  //   "4": {
  //     percentage: 1,
  //   },
  //   "5": {
  //     percentage: 1,
  //   },
  //   "6": {
  //     percentage: 1,
  //   },
  //   "7": {
  //     percentage: 1,
  //   },
  //   "8": {
  //     percentage: 1,
  //   },
  //   "9": {
  //     percentage: 1,
  //   },
  //   "10": {
  //     percentage: 1,
  //   },
  //   "11": {
  //     percentage: 1,
  //   },
  //   "12": {
  //     percentage: 1,
  //   },
  const randomDate = (start, end, startHour, endHour) => {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
    date.setHours(hour);
    return date;
  };
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, "0");
  };

  const formatDate = (date) => {
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1)].join("-");
  };

  const products = {
    camisa: [
      {
        name: "italiana",
        options: {
          1: {
            percentage: 7,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 7,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 5,
          },
        },
        price: 85.0,
      },
      {
        name: "inglesa",
        options: {
          1: {
            percentage: 7,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 7,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 5,
          },
        },
        price: 130.0,
      },
      {
        name: "cuteway",
        options: {
          1: {
            percentage: 7,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 7,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 5,
          },
        },
        price: 150.0,
      },
      {
        name: "smoking",
        options: {
          1: {
            percentage: 7,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 7,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 5,
          },
        },
        price: 100.0,
      },
    ],
    jean: [
      {
        name: "skinny",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 8,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 8,
          },
        },
        price: 120.0,
      },
      {
        name: "straight",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 8,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 8,
          },
        },
        price: 130.0,
      },
      {
        name: "bootcut",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 8,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 8,
          },
        },
        price: 150.0,
      },
      {
        name: "flared",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 8,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 8,
          },
        },
        price: 130.0,
      },
      {
        name: "wide leg",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 8,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 8,
          },
        },
        price: 120.0,
      },
      {
        name: "boyfriend",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 8,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 8,
          },
        },
        price: 120.0,
      },
      {
        name: "mom jeans",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 8,
          },
          8: {
            percentage: 1,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 8,
          },
        },
        price: 140.0,
      },
    ],
    chompa: [
      {
        name: "pullover",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 5,
          },
          6: {
            percentage: 5,
          },
          7: {
            percentage: 6,
          },
          8: {
            percentage: 7,
          },
          9: {
            percentage: 8,
          },
          10: {
            percentage: 6,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 8,
          },
        },
        price: 85.0,
      },
      {
        name: "cuello tortuga",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 1,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 5,
          },
          6: {
            percentage: 5,
          },
          7: {
            percentage: 6,
          },
          8: {
            percentage: 7,
          },
          9: {
            percentage: 8,
          },
          10: {
            percentage: 6,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 8,
          },
        },
        price: 90.0,
      },
      {
        name: "cárdigan",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 1,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 5,
          },
          6: {
            percentage: 5,
          },
          7: {
            percentage: 6,
          },
          8: {
            percentage: 7,
          },
          9: {
            percentage: 8,
          },
          10: {
            percentage: 6,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 8,
          },
        },
        price: 70.0,
      },
      {
        name: "twinset",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 1,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 5,
          },
          6: {
            percentage: 5,
          },
          7: {
            percentage: 6,
          },
          8: {
            percentage: 7,
          },
          9: {
            percentage: 8,
          },
          10: {
            percentage: 6,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 8,
          },
        },
        price: 60.0,
      },
      {
        name: "chaleco",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 1,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 5,
          },
          6: {
            percentage: 5,
          },
          7: {
            percentage: 6,
          },
          8: {
            percentage: 7,
          },
          9: {
            percentage: 8,
          },
          10: {
            percentage: 6,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 8,
          },
        },
        price: 60.0,
      },
      {
        name: "oversized",
        options: {
          1: {
            percentage: 2,
          },
          2: {
            percentage: 1,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 5,
          },
          6: {
            percentage: 5,
          },
          7: {
            percentage: 6,
          },
          8: {
            percentage: 7,
          },
          9: {
            percentage: 8,
          },
          10: {
            percentage: 6,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 8,
          },
        },
        price: 100.0,
      },
    ],
    colegio: [
      {
        name: "camisa",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 4,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 1,
          },
          6: {
            percentage: 6,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 4,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 9,
          },
        },
        price: 50.0,
      },
      {
        name: "guardapolvo",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 4,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 1,
          },
          6: {
            percentage: 6,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 4,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 9,
          },
        },
        price: 60.0,
      },
      {
        name: "deportivo",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 1,
          },
          6: {
            percentage: 6,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 4,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 3,
          },
        },
        price: 180.0,
      },
      {
        name: "falda",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 4,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 1,
          },
          6: {
            percentage: 6,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 4,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 9,
          },
        },
        price: 60.0,
      },
      {
        name: "jumper",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 4,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 1,
          },
          6: {
            percentage: 6,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 4,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 9,
          },
        },
        price: 60.0,
      },
      {
        name: "pantalon",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 4,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 1,
          },
          6: {
            percentage: 6,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 4,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 9,
          },
        },
        price: 110.0,
      },
      {
        name: "polera",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 4,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 1,
          },
          6: {
            percentage: 6,
          },
          7: {
            percentage: 5,
          },
          8: {
            percentage: 4,
          },
          9: {
            percentage: 1,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 9,
          },
        },
        price: 50.0,
      },
    ],
    sudadera: [
      {
        name: "canguro",
        options: {
          1: {
            percentage: 1,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 5,
          },
          6: {
            percentage: 5,
          },
          7: {
            percentage: 6,
          },
          8: {
            percentage: 7,
          },
          9: {
            percentage: 8,
          },
          10: {
            percentage: 6,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 8,
          },
        },
        price: 130.0,
      },
      {
        name: "cremallera",
        options: {
          1: {
            percentage: 1,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 5,
          },
          6: {
            percentage: 5,
          },
          7: {
            percentage: 6,
          },
          8: {
            percentage: 7,
          },
          9: {
            percentage: 8,
          },
          10: {
            percentage: 6,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 8,
          },
        },
        price: 100.0,
      },
      {
        name: "sin capucha",
        options: {
          1: {
            percentage: 1,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 1,
          },
          5: {
            percentage: 5,
          },
          6: {
            percentage: 5,
          },
          7: {
            percentage: 6,
          },
          8: {
            percentage: 7,
          },
          9: {
            percentage: 8,
          },
          10: {
            percentage: 6,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 8,
          },
        },
        price: 100.0,
      },
      {
        name: "técnica",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 3,
          },
          6: {
            percentage: 3,
          },
          7: {
            percentage: 3,
          },
          8: {
            percentage: 3,
          },
          9: {
            percentage: 3,
          },
          10: {
            percentage: 3,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 6,
          },
        },
        price: 150.0,
      },
    ],
    blusa: [
      {
        name: "bombacha",
        options: {
          1: {
            percentage: 6,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 3,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 6,
          },
          6: {
            percentage: 1,
          },
          7: {
            percentage: 1,
          },
          8: {
            percentage: 6,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 2,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 6,
          },
        },
        price: 100.0,
      },
      {
        name: "vichy",
        options: {
          1: {
            percentage: 6,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 3,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 6,
          },
          6: {
            percentage: 1,
          },
          7: {
            percentage: 1,
          },
          8: {
            percentage: 6,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 2,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 6,
          },
        },
        price: 90.0,
      },
      {
        name: "volante",
        options: {
          1: {
            percentage: 6,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 3,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 6,
          },
          6: {
            percentage: 1,
          },
          7: {
            percentage: 1,
          },
          8: {
            percentage: 6,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 2,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 6,
          },
        },
        price: 90.0,
      },
      {
        name: "asimetrica",
        options: {
          1: {
            percentage: 6,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 3,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 6,
          },
          6: {
            percentage: 1,
          },
          7: {
            percentage: 1,
          },
          8: {
            percentage: 6,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 2,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 6,
          },
        },
        price: 100.0,
      },
      {
        name: "blondas",
        options: {
          1: {
            percentage: 6,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 3,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 6,
          },
          6: {
            percentage: 1,
          },
          7: {
            percentage: 1,
          },
          8: {
            percentage: 6,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 2,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 6,
          },
        },
        price: 110.0,
      },
      {
        name: "transparente",
        options: {
          1: {
            percentage: 6,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 3,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 6,
          },
          6: {
            percentage: 1,
          },
          7: {
            percentage: 1,
          },
          8: {
            percentage: 6,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 2,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 6,
          },
        },
        price: 110.0,
      },
      {
        name: "rayas",
        options: {
          1: {
            percentage: 6,
          },
          2: {
            percentage: 6,
          },
          3: {
            percentage: 3,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 6,
          },
          6: {
            percentage: 1,
          },
          7: {
            percentage: 1,
          },
          8: {
            percentage: 6,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 2,
          },
          11: {
            percentage: 2,
          },
          12: {
            percentage: 6,
          },
        },
        price: 80.0,
      },
    ],
    interior: [
      {
        name: "medias",
        options: {
          1: {
            percentage: 4,
          },
          2: {
            percentage: 5,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 3,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 2,
          },
          8: {
            percentage: 2,
          },
          9: {
            percentage: 3,
          },
          10: {
            percentage: 3,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 7,
          },
        },
        price: 15.0,
      },
      {
        name: "calzones",
        options: {
          1: {
            percentage: 4,
          },
          2: {
            percentage: 5,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 3,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 2,
          },
          8: {
            percentage: 2,
          },
          9: {
            percentage: 3,
          },
          10: {
            percentage: 3,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 7,
          },
        },
        price: 20.0,
      },
      {
        name: "calzoncillos",
        options: {
          1: {
            percentage: 4,
          },
          2: {
            percentage: 5,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 3,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 2,
          },
          8: {
            percentage: 2,
          },
          9: {
            percentage: 3,
          },
          10: {
            percentage: 3,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 7,
          },
        },
        price: 20.0,
      },
      {
        name: "boxers",
        options: {
          1: {
            percentage: 4,
          },
          2: {
            percentage: 5,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 3,
          },
          5: {
            percentage: 2,
          },
          6: {
            percentage: 2,
          },
          7: {
            percentage: 2,
          },
          8: {
            percentage: 2,
          },
          9: {
            percentage: 3,
          },
          10: {
            percentage: 3,
          },
          11: {
            percentage: 3,
          },
          12: {
            percentage: 7,
          },
        },
        price: 25.0,
      },
    ],
    corbata: [
      {
        name: "slim",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 3,
          },
          6: {
            percentage: 8,
          },
          7: {
            percentage: 4,
          },
          8: {
            percentage: 3,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 6,
          },
        },
        price: 25.0,
      },
      {
        name: "ancha",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 3,
          },
          6: {
            percentage: 8,
          },
          7: {
            percentage: 4,
          },
          8: {
            percentage: 3,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 6,
          },
        },
        price: 35.0,
      },
      {
        name: "ascot",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 3,
          },
          6: {
            percentage: 8,
          },
          7: {
            percentage: 4,
          },
          8: {
            percentage: 3,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 6,
          },
        },
        price: 25.0,
      },
      {
        name: "lazo",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 3,
          },
          6: {
            percentage: 8,
          },
          7: {
            percentage: 4,
          },
          8: {
            percentage: 3,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 6,
          },
        },
        price: 25.0,
      },
      {
        name: "lavallière",
        options: {
          1: {
            percentage: 8,
          },
          2: {
            percentage: 2,
          },
          3: {
            percentage: 2,
          },
          4: {
            percentage: 2,
          },
          5: {
            percentage: 3,
          },
          6: {
            percentage: 8,
          },
          7: {
            percentage: 4,
          },
          8: {
            percentage: 3,
          },
          9: {
            percentage: 2,
          },
          10: {
            percentage: 1,
          },
          11: {
            percentage: 1,
          },
          12: {
            percentage: 6,
          },
        },
        price: 25.0,
      },
    ],
  };

  const generateDate = async () => {
    const timeSeries = [];
    const productsAux = [
      "camisa",
      "jean",
      "chompa",
      "colegio",
      "sudadera",
      "blusa",
      "interior",
      "corbata",
    ];
    // 99587
    for (let indexMain = 0; indexMain < 25856; indexMain++) {
      const date = randomDate(
        new Date(2014, 6, 9),
        new Date(2021, 11, 31),
        8,
        16
      );
      const month = date.getMonth() + 1;
      const n100 = Math.floor(Math.random() * 100 + 1);
      const nProducts = Math.floor(
        Math.random() * Object.keys(products).length
      );
      const currentProduct = productsAux[nProducts];
      let result = null;
      const itemProduct = products[currentProduct];
      const percentages = [];
      const productPercentageMonthAux = [];
      map(itemProduct, (item, index) => {
        map(item?.options, (itemOption, indexOption) => {
          if (parseInt(indexOption) === month) {
            productPercentageMonthAux.push({
              month,
              product: item.name,
              price: item.price,
              percentage: itemOption.percentage,
            });
            percentages.push(itemOption.percentage);
          } else {
            productPercentageMonthAux.push({
              month,
              product: item.name,
              price: item.price,
              percentage: 1,
            });
            percentages.push(1);
          }
        });
      });

      const max = Math.max(...percentages);
      let itemProductFinal = null;
      for (let i = 0; i < productPercentageMonthAux.length; i++) {
        const itemFinal = productPercentageMonthAux[i];
        if (itemFinal.percentage === max) {
          itemProductFinal = itemFinal;
        }
        if (itemProductFinal) {
          break;
        }
      }
      if (n100 <= max * 10) {
        result = {
          product: `${currentProduct} ${itemProductFinal.product}`,
          price: itemProductFinal.price,
          percentage: itemProductFinal.percentage,
        };
      }
      // console.log(itemProduct);
      if (result) {
        timeSeries.push({
          date: formatDate(date),
          product: result.product,
          price: result.price,
          // aux: result?.product,
          // aux2: result?.price,
          // aux3: result?.percentage,
          // aux4: n100,
          // aux5: max * 10,
          // aux6: currentProduct,
        });
      } else {
        indexMain--;
      }
    }
    const result = timeSeries.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });
    setDataset(result);
  };

  return (
    <div>
      <HeaderExportPage generateDate={generateDate} dataset={dataset} />
      {dataset && <Exports dataset={dataset} />}
    </div>
  );
}
//#endregion

// export function ReportsAdmin() {
//   const dataControl = [];
//   const dataMovement = [];
//   return (
//     <>
//       <HeaderPage2
//         title="Reportes"
//         exportExcel={{ title: "Convertir a Excel", data: dataControl }}
//       />

//       <div className="reports-admin">
//         <div className="reports-admin__control">
//           <div>
//             <Document file="somefile.pdf">
//               <Page pageNumber={1} />
//             </Document>
//             <p>Page 1 of 10</p>
//           </div>
//           <h2>Control de inventarios</h2>
//           <TableReportAdmin reports={dataControl} type="control" />
//         </div>
//         <div className="reports-admin__movement">
//           <h2>Movimientos de inventario</h2>
//           <TableReportAdmin reports={dataMovement} type="movement" />
//         </div>
//       </div>
//       {/* {loading ? (
//         <Loader active inline="centered">
//           Cargando...
//         </Loader>
//       ) : (
//         <TableCategoryAdmin
//           categories={categories}
//           updateCategory={updateCategory}
//           onDeleteCategory={onDeleteCategory}
//         />
//       )} */}
//       {/*
//       <ModalBasic
//         show={showModal}
//         onClose={openCloseModal}
//         title={titleModal}
//         children={contentModal}
//       /> */}
//     </>
//   );
// }
