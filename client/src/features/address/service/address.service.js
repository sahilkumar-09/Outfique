import axios from "axios";

const addressApiInstance = axios.create({
    baseURL: "/api/address",
    withCredentials: true
})

export const createAddress = async (formdata) => {
    const response = await addressApiInstance.post("/",  formdata )
    return response.data
}

export const getAddress = async () => {
    const response = await addressApiInstance.get("/")
    return response.data
    console.log(response.data)
}

export const getAddressById = async (addressId) => {
    const response = await addressApiInstance.get(`/${addressId}`)
    return response.data
}

export const updateAddress = async (addressId, addressData) => {
    const response = await addressApiInstance.patch(`/${addressId}`, addressData)
    return response.data
}

export const deleteAddress = async (addressId) => {
    const response = await addressApiInstance.delete(`/${addressId}`)
    return response.data
}

export const setAsDefault = async (addressId) => {
    const response = await addressApiInstance.patch(`/${addressId}/default`)
    return response.data
}