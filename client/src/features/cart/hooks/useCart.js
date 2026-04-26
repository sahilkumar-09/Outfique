import { addItems, setItems } from "../state/cart.slice";
import {useDispatch} from "react-redux"
import { addToCart, getAllCartItems, incrementCartItems } from "../service/cart.api";

export const useCart = () => {
    const dispatch = useDispatch()

    const handleAddToCart = async ({ productId, variantId }) => {
        const data = await addToCart({ productId, variantId })
        dispatch(addItems(data.items))
        return data.items
    }

    const handleGetAllAddToCart = async () => {
        const data = await getAllCartItems()
        dispatch(setItems(data.cart.items))
        return data.cart.items
    }

    const handleIncrementItems = async ({ productId, variantId }) => {
        const data = await incrementCartItems({ productId, variantId })
        dispatch(incrementCartItems({ productId, variantId }))
        return data
     }


    return { handleAddToCart, handleGetAllAddToCart, handleIncrementItems };
}