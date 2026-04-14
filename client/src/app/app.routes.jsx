import {createBrowserRouter} from "react-router"
import Register from "../features/auth/pages/Register"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home page</h1>
    },
    {
        path: "/auth/user/register",
        element: <Register/>
    }
])