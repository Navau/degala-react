import { BASE_API } from "../utils/constants";

export async function getAllDatasetApi(token) {
  try {
    const url = `${BASE_API}/api/dataset/`;
    const params = {
      methot: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 200) throw result;
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getDatasetByRangeDateApi(fromDate, toDate, token) {
  try {
    const url = `${BASE_API}/api/dataset/?date__range=${fromDate},${toDate}`;
    const params = {
      methot: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 200) throw result;
    return result;
  } catch (err) {
    throw err;
  }
}
