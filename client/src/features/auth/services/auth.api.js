import axios from "axios"

const authApiInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const register = async ({ email, contact, password, fullName, isSeller }) => {
        const response = await authApiInstance.post("/register", {
            email,
            contact,
            password,
            fullName,
            isSeller
        })
        return response.data

}

export const login = async ({ email, password }) => {
        const response = await authApiInstance.post("/login", { email, password })
        return response.data
}   

export const getMe = async() => {
    const response = await authApiInstance.get("/me")
    return response.data
}

export const logout = async () => {
  const response = await authApiInstance.post("/logout")
  return response.data
}

export const forgotPassword = async({email}) => {
  const response = await authApiInstance.post("/forgot-password", {email})
  return response.data
}

export const resetPassword = async ({ resetToken, otp, password, confirmPassword }) => {
  const response = await authApiInstance.post(`/reset-password/${resetToken}`, 
    {
      otp, password, confirmPassword
    }
  )

  return response.data
}