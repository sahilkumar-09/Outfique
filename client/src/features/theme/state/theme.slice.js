import { createSlice } from "@reduxjs/toolkit";

const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
        return savedTheme
    }

    return "system"
}

const initialState = {
    mode: getInitialTheme(),
    actualTheme:
        getInitialTheme() === "system"
        ? getSystemTheme() : getInitialTheme()
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload
            localStorage.setItem("theme", action.payload)
            if (action.payload === "system") {
                state.actualTheme = getSystemTheme()
            } else {
                state.actualTheme = action.payload
            }
        },
        updateTheme: (state) => {
            if (state.mode === "system") {state.actualTheme === getSystemTheme(); }
            
        }
    }
})

export const { setTheme, updateTheme } = themeSlice.actions
export default themeSlice.reducer