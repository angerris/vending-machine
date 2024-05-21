import axiosConfigured from "@/libs/axios/main.config";

async function getProducts() {
  const res = await axiosConfigured.get(`products/`);
  return res.data;
}

export async function getBasketsList() {
  const res = await axiosConfigured.get(`baskets/`);
  return res.data;
}

export async function addItemToBasket(id, count) {
  const res = await axiosConfigured.post(`baskets/${id}/add`, { count });
  return res.data;
}

export async function updateBasketItem(id, count) {
  const res = await axiosConfigured.put(`baskets/${id}/`, { count });
  return res.data;
}

export async function deleteBasketItem(id) {
  const res = await axiosConfigured.delete(`baskets/${id}/`);
  return res.data;
}

export async function checkout() {
  const res = await axiosConfigured.post(`checkout/`);
  return res.data;
}

export default getProducts;
