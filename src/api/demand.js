import { BASE_API } from "../utils/constants";

export async function getDemandPredictApi(token) {
  try {
    const url = `${BASE_API}/api/predict/`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);
    console.log(response);
    if (response.status !== 200) {
      throw new Error(
        "Hubo un error al obtener la información de la demanda.",
        response
      );
    }
    const result = await response.json();
    return result;
  } catch (err) {
    // console.log(err);
    throw err;
  }
}
export async function getDemandPredictByMonthApi(month, token) {
  try {
    const url = `${BASE_API}/api/predict/${month}/`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);
    console.log(response);
    if (response.status !== 200) {
      throw new Error(
        "Hubo un error al obtener la información de la demanda.",
        response
      );
    }
    const result = await response.json();
    return result;
  } catch (err) {
    // console.log(err);
    throw err;
  }
}
