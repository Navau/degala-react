import { BASE_API } from "../utils/constants";

export async function getProductsApi() {
  try {
    const url = `${BASE_API}/api/products/`;
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

export async function getProductsByCategoryIDApi(id) {
  try {
    const url = `${BASE_API}/api/products/?category=${id}`;
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

export async function addProductApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("color", data.color);
    formData.append("stock", data.stock);
    formData.append("genre", data.genre);
    formData.append("description", data.description);
    formData.append("fabric", data.category);
    formData.append("category", data.category);
    formData.append("active", data.active);
    formData.append("image", data.image);
    const url = `${BASE_API}/api/products/`;
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
    return { err };
  }
}

export async function updateProductApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("color", data.color);
    formData.append("stock", data.stock);
    formData.append("genre", data.genre);
    formData.append("description", data.description);
    formData.append("fabric", data.fabric);
    formData.append("category", data.category);
    formData.append("active", data.active);
    if (data.image) {
      formData.append("image", data.image);
    }

    const url = `${BASE_API}/api/products/${id}/`;
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

export async function updateProductStockApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/products/${id}/`;
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

export async function deleteProductApi(id, token) {
  try {
    const url = `${BASE_API}/api/products/${id}/`;
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

export async function getProductByIdApi(id) {
  try {
    const url = `${BASE_API}/api/products/${id}/`;
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
