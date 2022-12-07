import { BASE_API } from "../utils/constants";

export async function getSales2Api() {
  try {
    const url = `${BASE_API}/api/sales2/`;
    const params = {
      method: "GET",
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function addSale2Api(data, token) {
  console.log(data);
  try {
    const url = `${BASE_API}/api/sales2/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 200 && response.status !== 201) throw result;

    return result;
  } catch (err) {
    return { err };
  }
}

export async function updateSale2Api(id, data, token) {
  try {
    console.log(data);
    const url = `${BASE_API}/api/sales2/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 200 && response.status !== 201) throw result;

    return result;
  } catch (err) {
    console.log("ERR API", err);
    return { err };
  }
}

export async function deleteSale2Api(id, token) {
  try {
    const url = `${BASE_API}/api/sales2/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getSale2ByIdApi(id) {
  try {
    const url = `${BASE_API}/api/sales2/${id}/`;
    const params = {
      method: "GET",
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function changeStatusApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/users/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 200 && response.status !== 201) throw result;

    return result;
  } catch (err) {
    console.log("ERR API", err);
    return { err };
  }
}
