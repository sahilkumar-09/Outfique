import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileData: null,
        loading: false,
        error: null
    },
    reducers: {
        createProfile: (state, action) => {
            state.profileData = action.payload
        },
        setProfileLoading: (state, action) => {
            state.loading = action.payload
        },
        clearProfile: (state) => {
            state.error = null
        }
    }
})

export const {createProfile, setProfileLoading, clearProfile} = profileSlice.actions
export default profileSlice.reducer