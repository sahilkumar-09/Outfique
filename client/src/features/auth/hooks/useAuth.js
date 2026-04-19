import { useDispatch } from "react-redux"
import { setUser, setLoading, setError } from "../state/auth.slice"
import { getMe, login, register } from "../services/auth.api"

export const useAuth = () => { 
    const dispatch = useDispatch()
    const handleRegister = async ({ email, contact, password, fullName, isSeller = false }) => {

            const data = await register({ email, contact, password, fullName, isSeller })
            dispatch(setUser(data.user))
            return data.user

    }
    const handleLogin = async ({ email, password }) => {

            const data = await login({ email, password })
            dispatch(setUser(data.user))
            return data.user
    }
    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true))
            const data = await getMe();
            dispatch(setUser(data.user))
            return data.user
        } catch (error) {
            dispatch(setError(error.message))
        }finally{
            dispatch(setLoading(false))
        }
    }
    return { handleRegister, handleLogin, handleGetMe }
}