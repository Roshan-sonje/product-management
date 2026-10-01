import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/products'

export const getAllProducts = () => axios.get(API_BASE_URL)

export const getProductById = (id) => axios.get(`${API_BASE_URL}/${id}`)

export const createProduct = (product) => axios.post(API_BASE_URL, product)

export const updateProduct = (id, product) => axios.put(`${API_BASE_URL}/${id}`, product)

export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/${id}`)