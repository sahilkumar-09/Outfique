import React, { useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { useSelector } from 'react-redux'

const Cart = () => {

    const cartItems = useSelector(state => state.cart.items)

    const { handleGetAllAddToCart } = useCart()

    
    useEffect(() => {
        handleGetAllAddToCart()
    }
    , [])
    console.log(cartItems)
  return (
    <div>
      
    </div>
  )
}

export default Cart
