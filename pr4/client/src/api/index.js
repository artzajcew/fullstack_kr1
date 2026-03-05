import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "accept": "application/json",
  }
});

export const api = {
  // Получить все товары
  getProducts: async () => {
    const response = await apiClient.get("/products");  // /users → /products
    return response.data;
  },
  
  // Получить товар по ID
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);  // /users → /products
    return response.data;
  },
  
  // Создать новый товар
  createProduct: async (product) => {  // user → product
    const response = await apiClient.post("/products", product);  // /users → /products
    return response.data;
  },
  
  // Обновить товар
  updateProduct: async (id, product) => {  // user → product
    const response = await apiClient.patch(`/products/${id}`, product);  // /users → /products
    return response.data;
  },
  
  // Удалить товар
  deleteProduct: async (id) => {  // user → product
    const response = await apiClient.delete(`/products/${id}`);  // /users → /products
    return response.data;
  }
};