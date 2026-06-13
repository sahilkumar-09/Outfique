import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        sellerProducts: [],
        allProducts: [],
        searchResult: [],
        category: []
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
        }
    }
}) 

export const { setSellerProducts, setAllProducts, setSearchResult, setCategory } =
  productSlice.actions;
export default productSlice.reducer