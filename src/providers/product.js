//khai bao cac ham call api

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/";
// get list
export const getList = async ({ resource = "products" }) => {
  const { data } = await axios.get(resource);
  return data;
};
// get detail
export const getDetail = async (resource = "products", id) => {
  if (!id) return;
  const { data } = await axios.get(`${resource}/${id}`);
  return data;
};
// createProduct
export const createProduct = async (resource = "products", values) => {
  const { data } = await axios.post(resource, values);
  return data;
};
// updateProduct
export const updateProduct = async (resource = "products", id, values) => {
  if (!id) return;
  const { data } = await axios.put(`${resource}/${id}`, values);
  return data;
};
// deleteProduct
export const deleteProduct = async (id, resource = "products") => {
  if (!id) return;
  const { data } = await axios.delete(`${resource}/${id}`);
  return data;
};
// đăng ký tài khoản
export const register = async (values) => {
  // giả sử backend có endpoint /register
  const { data } = await axios.post("/register", values);
  return data;
};

// đăng nhập
export const login = async (values) => {
  // giả sử backend có endpoint /login
  const { data } = await axios.post("/login", values);
  return data;
};
