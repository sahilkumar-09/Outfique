import { useDispatch } from "react-redux"
import { createProducts, getSellerAllProducts } from "../service/product.api"
import { setSellerProducts } from "../state/product.slice"

export const useProduct = () => {
    const dispatch = useDispatch()

    const handleCreateProducts = async (formData) => {
        try {
            const data = await createProducts(formData)
            return data.products
        } catch (error) {
            throw error.message
        }
    }

    const handleGetSellerProduct = async () => {
        try {
            const data = await getSellerAllProducts()
            dispatch(setSellerProducts(data.products))
            return data.products
        } catch (error) {
            throw error.message
        }
    }

    return {
        handleCreateProducts,
        handleGetSellerProduct
    }
}