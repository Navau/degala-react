import React from "react";

import "./Exports.scss";

export function Exports(props) {
  const {} = props;
  //   enero: {
  //     percentage: 0.1,
  //   },
  //   febrero: {
  //     percentage: 0.1,
  //   },
  //   marzo: {
  //     percentage: 0.1,
  //   },
  //   abril: {
  //     percentage: 0.1,
  //   },
  //   mayo: {
  //     percentage: 0.1,
  //   },
  //   junio: {
  //     percentage: 0.1,
  //   },
  //   julio: {
  //     percentage: 0.1,
  //   },
  //   agosto: {
  //     percentage: 0.1,
  //   },
  //   septiembre: {
  //     percentage: 0.1,
  //   },
  //   octubre: {
  //     percentage: 0.1,
  //   },
  //   noviembre: {
  //     percentage: 0.1,
  //   },
  //   diciembre: {
  //     percentage: 0.1,
  //   },
  const randomDate = (start, end, startHour, endHour) => {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
    date.setHours(hour);
    return date;
  };
  const products = {
    camisa: [
      {
        name: "italiana",
        options: {
          enero: {
            percentage: 0.7,
          },
        },
        price: 137.2,
      },
      {
        name: "inglesa",
        options: {
          enero: {
            percentage: 0.7,
          },
        },
        price: 267.54,
      },
      {
        name: "cuteway",
        options: {
          enero: {
            percentage: 0.7,
          },
        },
      },
      {
        name: "americana",
        options: {
          enero: {
            percentage: 0.7,
          },
        },
      },
      {
        name: "smoking",
        options: {
          enero: {
            percentage: 0.7,
          },
        },
      },
    ],
    jean: [
      {
        name: "skinny",
      },
      {
        name: "straight",
      },
      {
        name: "bootcut",
      },
      {
        name: "flared",
      },
      {
        name: "wide leg",
      },
      {
        name: "boyfriend",
      },
      {
        name: "mom jeans",
      },
      {
        name: "cropped",
      },
      {
        name: "cropped-flared",
      },
      {
        name: "slouchy",
      },
    ],
    chompa: [
      {
        name: "pulóver",
      },
      {
        name: "cuello tortuga",
      },
      {
        name: "cárdigan",
      },
      {
        name: "twin set",
      },
      {
        name: "chaleco",
      },
      {
        name: "oversized",
      },
    ],
    colegio: [
      {
        name: "guardapolvo",
      },
      {
        name: "deportivo",
      },
      {
        name: "falda",
      },
      {
        name: "jumper",
      },
      {
        name: "pantalon",
      },
      {
        name: "polera",
      },
    ],
    utilitario: [
      {
        name: "sombrero",
      },
      {
        name: "gorra",
      },
    ],
    sudadera: [
      {
        name: "canguro",
      },
      {
        name: "cremallera",
      },
      {
        name: "sin capucha",
      },
      {
        name: "técnica",
      },
    ],
    blusa: [
      {
        name: "bombacha",
      },
      {
        name: "vichy",
      },
      {
        name: "volante",
      },
      {
        name: "asimetrica",
      },
      {
        name: "blondas",
      },
      {
        name: "transparente",
      },
      {
        name: "rayas",
      },
    ],
    interior: [
      {
        name: "medias",
      },
      {
        name: "calzones",
      },
      {
        name: "calzoncillos",
      },
      {
        name: "boxers",
      },
    ],
    corbata: [
      {
        name: "slim",
      },
      {
        name: "ancha",
      },
      {
        name: "ascot",
      },
      {
        name: "lazo",
      },
      {
        name: "lavallière",
      },
    ],
  };

  for (let indexMain = 0; indexMain < 100; indexMain++) {}
  return (
    <div>
      <h1>Exports</h1>
    </div>
  );
}
