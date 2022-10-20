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
    if (response.status !== 200) {
      throw new Error("Usuario o contraseña incorrectas.");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
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
    if (response.status !== 200) {
      throw new Error(
        "Hubo un error al obtener la información de los usuarios."
      );
    }
    const result = await response.json();
    return result;
  } catch (err) {
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
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
}
