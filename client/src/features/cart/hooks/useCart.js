import { addItems, decrementItems, deleteItems, incrementItems, setItems } from "../state/cart.slice";
import {useDispatch} from "react-redux"
import { addToCart, decrementCartItems, deleteCartItems, getAllCartItems, incrementCartItems } from "../service/cart.api";

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
        await incrementCartItems({ productId, variantId })
        dispatch(incrementItems({ productId, variantId }));
     }

    const handleDecrementItems = async ({ productId, variantId }) => {
        await decrementCartItems({productId, variantId})
        dispatch(decrementItems({ productId, variantId }));
    }

    const handleDeleteItems = async ({ productId, variantId }) => {
        await deleteCartItems({ productId, variantId })
        dispatch(deleteItems({ productId, variantId }))
    }

    return { handleAddToCart, handleGetAllAddToCart, handleIncrementItems, handleDecrementItems, handleDeleteItems };
}