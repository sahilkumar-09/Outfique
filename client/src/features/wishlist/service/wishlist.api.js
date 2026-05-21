import axios from "axios"

const wishlistInstance = axios.create({
  baseURL: "/api/wishlist",
});

export const addWishlist =async (productId, variantId) => {
    const response = await wishlistInstance.post(`/add/${productId}/${variantId}`);
    return response.data
}

export const getWishlist = async () => {
    const response = await wishlistInstance.get("/")
    return response.data
}

export const deleteWishList = async (productId, variantId) => {
    const response = await wishlistInstance.delete(`/${productId}/${variantId}`)
    return response.data
}