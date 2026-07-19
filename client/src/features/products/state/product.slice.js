import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        sellerProducts: [],
        allProducts: [],
        searchResult: [],
        category: [],
    },  
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload
        },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload
        },
        setSearchResult: (state, action) => {
            state.searchResult = action.payload 
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        deleteProduct: (state, action) => {
            const { productId } = action.payload
            state.sellerProducts = state.sellerProducts.filter(
                (product) => product._id !== productId
            )
            state.allProducts = state.allProducts.filter((product) => product._id !== productId
            )
            state.searchResult = state.searchResult.filter((product) => product._id !== productId) 
        },
        deleteVariant: (state, action) => {
            const { variantId } = action.payload
            const removeVariant = (products) => {
                products.map(product => (
                    {
                        ...product, variants: product.variants.filter(
                        (variant) => variant._id !== variantId
                    )}
                ))
            }
            state.sellerProducts = removeVariant(state.sellerProducts)
            state.allProducts = removeVariant(state.allProducts)
            state.searchResult = removeVariant(state.searchResult)
        }
    }
}) 

export const { setSellerProducts, setAllProducts, setSearchResult, setCategory, deleteProduct, deleteVariant } =
  productSlice.actions;
export default productSlice.reducer