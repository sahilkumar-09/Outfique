import axios from "axios"

const apiCartInstance = axios.create({
    baseURL: "/api/cart",
    withCredentials: true
})

export const addToCart = async({ productId, variantId }) => {
    try {
        const response = await apiCartInstance.post(`/add/${productId}/${variantId}`, {
            quantity: 1
        })
        return response.data
    } catch (error) {
        throw error.message
    }
}

export const getAllCartItems = async () => {
    try {
        const response = await apiCartInstance.get("/")
        return response.data
    } catch (error) {
        throw error.message
    }
}

export const incrementCartItems = async ({productId, variantId}) => {
    try {
        const response = await apiCartInstance.patch(
          `/quantity/increment/${productId}/${variantId}`,
        );
        return response.data
    } catch (error) {
        throw error.message
    }
}

export const decrementCartItems = async({productId, variantId}) => {
    try {
        const response = await apiCartInstance.patch(
          `/quantity/decrement/${productId}/${variantId}`,
        );
        return response.data
    } catch (error) {
        throw error.message
    }
}

export const deleteCartItems = async({productId, variantId}) => {
    try {
        const response = await apiCartInstance.delete(
          `/delete/${productId}/${variantId}`
        );
        return response.data
    } catch (error) {
        throw error.message
    }
}