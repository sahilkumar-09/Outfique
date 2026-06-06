import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import { useSelector}  from "react-redux"
import { useAuth } from '../features/auth/hooks/useAuth'
import "remixicon/fonts/remixicon.css";
import { updateTheme } from '@/features/theme/state/theme.slice'

const App = () => {
  const actualTheme = useSelector(state => state.theme.mode)
  
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(actualTheme)
  }, [actualTheme])

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark")
    const handleChange = () => {
      updateTheme()
    }

    media.addEventListener("change", handleChange)
    return () => media.removeEventListener("change", handleChange)
  }, [])
  
  useSelector(state => state.auth.user)
  const { handleGetMe } = useAuth()
  
  useEffect(() => {
    handleGetMe()
  }, [])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App