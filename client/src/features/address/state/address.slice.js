import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    selectedAddress: null,
    loading: true,
    error: null,
  },
  reducers: {
    setAddress: (state, action) => {
      state.addresses = action.payload;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setUpdateAddress: (state, action) => {
      const { addressId, data } = action.payload;
      state.addresses = state.addresses.map((address) =>
        address._id === addressId ? data : address,
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setDeleteAddress: (state, action) => {
      const { addressId } = action.payload;
      state.addresses = state.addresses.filter(
        (address) => address._id !== addressId,
      );
    },
    clearAddress: (state) => {
      state.addresses = [];
      state.selectedAddress = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAddress, setError, setLoading, setSelectedAddress, setUpdateAddress, setDeleteAddress, clearAddress } = addressSlice.actions
export default addressSlice.reducer