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
      const { productId, variantId } = action.payload;

      const item = state.items.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );

      if (item) {
        item.quantity += 1;
      }
    },
    decrementItems: (state, action) => {
      const { productId, variantId } = action.payload
      const item = state.items.find((item) => item.productId === productId && item.variantId === variantId)
      if(item) {
        item.quantity -= 1
      }
    },
    deleteItems: (state, action) => {
      const {productId, variantId} = action.payload

      state.items = state.items.filter((item) => !(item.productId === productId && item.variantId === variantId))
      
    }
  },
});

export const { setItems, addItems, incrementItems, decrementItems, deleteItems } =
  cartSlice.actions;
export default cartSlice.reducer;
