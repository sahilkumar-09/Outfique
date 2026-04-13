import { useDispatch } from "react-redux"
import { setUser, setLoading, setError } from "../state/auth.slice"
import { register } from "../services/auth.api"

export const useAuth = () => { 
    const dispatch = useDispatch()
    const handleRegister = async ({ email, contact, password, fullName, isSeller = false }) => {
        try {
            dispatch(setLoading(true))
            const data = await register({ email, contact, password, fullName, isSeller })
            dispatch(setUser(data.user))
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }
    return { handleRegister }
}