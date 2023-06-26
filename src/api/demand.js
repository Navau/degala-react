import { BASE_API } from "../utils/constants";

export async function getAllDemandApi(token) {
  try {
    const url = `${BASE_API}/api/demand/`;
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

export async function getDemandByRangeDateApi(fromDate, toDate, token) {
  try {
    const url = `${BASE_API}/api/demand/?date__range=${fromDate},${toDate}`;
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

export async function getDemandPredictByRangeDateApi(fromDate, toDate, token) {
  try {
    const url = `${BASE_API}/api/demand/predict-month/?from_date=${fromDate}&to_date=${toDate}`;
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
    if (response.status !== 200) {
      throw new Error(
        "Hubo un error al obtener la información de la demanda.",
        response
      );
    }
    const result = await response.json();
    return result;
  } catch (err) {
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
