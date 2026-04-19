import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './app.routes'
import {useSelector}  from "react-redux"
import { useAuth } from '../features/auth/hooks/useAuth'

const App = () => {
  const user = useSelector(state => state.auth.user)
  const { handleGetMe } = useAuth()
  
  useEffect(() => {
    handleGetMe()
  }, [])

  console.log(user)
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App