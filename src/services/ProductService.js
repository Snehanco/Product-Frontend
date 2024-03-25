// Import the http instance for making HTTP requests
import http from "../http-common";

// Define methods for interacting with the product API
const ProductService = {
  getAll: () => {
    return http.get("/products");
  },
  get: (id) => {
    return http.get(`/products/${id}`);
  },
  create: (data) => {
    return http.post("/products", data);
  },
  update: (id, data) => {
    return http.put(`/products/${id}`, data);
  },
  remove: (id) => {
    return http.delete(`/products/${id}`);
  },
  removeAll: () => {
    return http.delete("/products");
  },
  // Define the searchByName function
  searchByName: (name) => {
    return http.get(`/products/search?name=${name}`);
  },
};

export default ProductService;
