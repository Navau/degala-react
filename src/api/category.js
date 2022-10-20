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

export async function addCategoryApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("image", data.image);
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
    return result;
  } catch (err) {
    throw err;
  }
}

export async function updateCategoryApi(id, data, token) {
  try {
    const formData = new FormData();

    formData.append("title", data.title);
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
    return result;
  } catch (err) {
    throw err;
  }
}

export async function deleteCategoryApi(id, token) {
  try {
    const url = `${BASE_API}/api/categories/${id}/`;
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
