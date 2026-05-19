import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: true,
        error: null
    },
    reducers: { 
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        logout: (state, action) => {
            state.user = null
            state.error = null
            state.loading = false
        }
    }
})

export const { setUser, setLoading, setError, logout } = authSlice.actions
export default authSlice.reducer