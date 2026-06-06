import { useDispatch } from "react-redux";
import {
  getMe,
  login,
  logout as logoutApi,
  register,
} from "../services/auth.api";
import { logout, setError, setLoading, setUser } from "../state/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const handleRegister = async ({
    email,
    contact,
    password,
    fullName,
    isSeller = false,
  }) => {
    const data = await register({
      email,
      contact,
      password,
      fullName,
      isSeller,
    });
    dispatch(setUser(data.user));
    return data.user;
  };
  const handleLogin = async ({ email, password }) => {
    const data = await login({ email, password });
    dispatch(setUser(data.user));
    return data.user;
  };
  const handleGetMe = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
      return data.user;
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  return { handleRegister, handleLogin, handleGetMe, handleLogout };
};
