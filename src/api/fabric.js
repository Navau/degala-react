import { BASE_API } from "../utils/constants";

export async function getFabricsApi(token) {
  try {
    const url = `${BASE_API}/api/fabrics/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Hubo un error al obtener la información de las telas.");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function addFabricApi(data, token) {
  try {
    const url = `${BASE_API}/api/fabrics/`;
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
    return result;
  } catch (err) {
    throw err;
  }
}

export async function updateFabricApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/fabrics/${id}/`;
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
    return result;
  } catch (err) {
    throw err;
  }
}

export async function deleteFabricApi(id, token) {
  try {
    const url = `${BASE_API}/api/fabrics/${id}/`;
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
