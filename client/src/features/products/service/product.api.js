import axios from "axios"

const productApiInstance = axios.create({
    baseURL: "/api/products"
})

export const createProducts =async (formData) => {
    try {
        const response = await productApiInstance.post("/", formData)
        return response.data
    } catch (error) {
        throw error.message
    }
}

export const getSellerAllProducts = async () => {
    try {
        const response = await productApiInstance.get("/seller")
        return response.data
    } catch (error) {
        throw error.message
    }
}

export const getAllProducts = async () => {
        const response = await productApiInstance.get("/")
        return response.data
}

export const getProductById = async (productId) => {
    try {
        const response = await productApiInstance.get(`/details/${productId}`);
        return response.data
    } catch (error) {
        throw error.message
    }
}