import {createBrowserRouter} from "react-router"
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login"
import CreateProduct from "../features/products/pages/CreateProduct"
import Dashboard from "../features/products/pages/Dashboard"
import Protected from "../features/auth/components/Protected"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home page</h1>
    },
    {
        path: "/auth/user/register",
        element: <Register/>
    },
    {
        path: "/auth/user/login",
        element: <Login/>
    },
    {
        path: "/seller",
        children: [
            {
                path: "/seller/create-product",
                element: <Protected role="seller">
                    <CreateProduct/>
                </Protected>
            },
            {
                path: "/seller/dashboard",
                element: <Protected role="seller">
                    <Dashboard/>
                </Protected>
            }
        ]
    },
])