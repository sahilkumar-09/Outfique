import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItems: (state, action) => {
      state.items.push(action.payload);
    },
    incrementItems: (state, action) => {
      const { productId, variantId } = action.payload
      state.items = state.items.map(item => {
        if (productId === item.productId && variantId === item.variantId) {
          return { ...item, quantity: item.quantity + 1 }
        } else { 
          return item
         }
      })
    }
  },
});

export const { setItems, addItems, incrementItems } = cartSlice.actions;
export default cartSlice.reducer;
