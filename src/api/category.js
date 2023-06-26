import { isEmpty } from "lodash";
import { BASE_API } from "../utils/constants";

export async function getCategoriesApi() {
  try {
    const url = `${BASE_API}/api/categories/`;
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

export async function searchCategoriesApi(search) {
  try {
    let url = "";
    url += `${BASE_API}/api/categories/`;
    url += !isEmpty(search) ? `?search=${encodeURIComponent(search)}` : "";
    const params = {
      headers: {
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

export async function addCategoryApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("active", data.active);
    formData.append("title", data.title);

    // SE ENVIAN MEDIANTE FORMDATA IMAGENES
    const url = `${BASE_API}/api/categories/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

export async function updateCategoryApi(id, data, token) {
  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("active", data.active);
    if (data.image) {
      formData.append("image", data.image);
    }
    // SE ENVIAN MEDIANTE FORMDATA IMAGENES
    const url = `${BASE_API}/api/categories/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

export async function deleteCategoryApi(id, token) {
  try {
    const url = `${BASE_API}/api/categories/${id}/`;
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
