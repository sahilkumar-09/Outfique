import {createBrowserRouter} from "react-router"
import Register from "../features/auth/pages/Register"
import Login from "../features/auth/pages/Login"
import CreateProduct from "../features/products/pages/CreateProduct"
import Dashboard from "../features/products/pages/Dashboard"
import Protected from "../features/auth/components/Protected"
import Home from "../features/products/pages/Home"
import ProductDetail from "../features/products/pages/ProductDetail"
import SellerProductDetail from "../features/products/pages/SellerProductDetail"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
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
            },
            {
                path: "/seller/product/:productId",
                element: <Protected role="seller">
                    <SellerProductDetail/>
                </Protected>
            }
        ]
    },
    {
        path: "/product/:productId",
        element: <ProductDetail/>
    }
])