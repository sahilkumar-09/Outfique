import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: []
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload
        },
        addItems: (state, action) => {
            state.items.push(action.payload)
        },
        deleteItems: (state, action) => {
            const {productId, variantId} = action.payload
            state.items = state.items.filter((item) => !(item.productId._id === productId && item.variantId === variantId))
        }
    }
})

export const {setItems, addItems, deleteItems} = wishlistSlice.actions
export default wishlistSlice.reducer