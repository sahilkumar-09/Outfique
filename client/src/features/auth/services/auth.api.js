import axios from "axios"

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/v1/auth",
    withCredentials: true
})

export const register = async ({ email, contact, password, fullName, isSeller }) => {
    try {
        const response = await authApiInstance.post("/user/register", {
            email,
            contact,
            password,
            fullName,
            isSeller
        })
        return response.data
    } catch (error) {
        throw error
    }
}