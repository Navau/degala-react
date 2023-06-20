import { BASE_API } from "../utils/constants";

export async function getAllDatasetApi() {
  try {
    const url = `${BASE_API}/api/dataset/`;
    const params = {
      methot: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, params);
    if (response.status !== 200)
      throw new Error("Hubo un error al obtener la información de las ventas");
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getDatasetByRangeDateApi(fromDate, toDate) {
  try {
    const url = `${BASE_API}/api/dataset/?date__range=${fromDate},${toDate}`;
    const params = {
      methot: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(url, params);
    if (response.status !== 200)
      throw new Error("Hubo un error al obtener la información de las ventas");
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}
