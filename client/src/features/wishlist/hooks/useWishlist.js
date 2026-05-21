import {useDispatch} from "react-redux"
import { addItems, deleteItems } from "../state/wishlist.state"
import { addWishlist, deleteWishList, getWishlist } from "../service/wishlist.api"

export const useWishlist = () => {
    const dispatch = useDispatch()

    const handleAddWishlist = async(productId, variantId) => {
        try {
            const item = await addWishlist(productId, variantId)
            dispatch(addItems(item))
        } catch (error) {
            throw error.message
        }
    }

    const handleGetWishlist = async () => {
        try {
            const items = await getWishlist()
            return items.wishlist;
        } catch (error) {
            throw error.message
        }
    }

    const handleDeleteWishlist = async (productId, variantId) => {
        try {
             await deleteWishList(productId, variantId)            
            dispatch(deleteItems({productId, variantId}))   
        } catch (error) {
            throw error.message
        }
    }
    return {handleAddWishlist, handleGetWishlist, handleDeleteWishlist}
}