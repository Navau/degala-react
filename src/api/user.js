import { isEmpty, isUndefined } from "lodash";
import { BASE_API } from "../utils/constants";

export async function loginApi(formValue) {
  try {
    const url = `${BASE_API}/api/auth/login/`;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    if (response.status !== 200) throw result;
    return result;
  } catch (err) {
    throw new Error(
      "No se encontro ningun usuario con este email o contraseña"
    );
  }
}

export async function getMeApi(token) {
  try {
    const url = `${BASE_API}/api/auth/me/`;
    const params = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);
    if (response.status !== 200) {
      throw new Error("Hubo un error al obtener la información del usuario.");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}

export async function getUsersApi(token) {
  try {
    const url = `${BASE_API}/api/users/`;
    const params = {
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
    console.log(err);
    throw err;
  }
}

export async function searchUsersApi(search, token) {
  try {
    let url = "";
    url += `${BASE_API}/api/users/`;
    url += !isEmpty(search) ? `?search=${encodeURIComponent(search)}` : "";
    const params = {
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
    console.log(err);
    throw err;
  }
}

export async function addUserApi(data, token) {
  try {
    const url = `${BASE_API}/api/users/`;
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

export async function updateUserApi(id, data, token) {
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
    return result;
  } catch (err) {
    throw err;
  }
}

export async function deleteUserApi(id, token) {
  try {
    const url = `${BASE_API}/api/users/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, params);
    if (response.status === 204) return true;
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
