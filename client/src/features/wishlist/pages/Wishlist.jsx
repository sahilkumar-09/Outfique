import React from 'react'
import { useState } from 'react'
import { useWishlist } from '../hooks/useWishlist'
import { useEffect } from 'react'

const Wishlist = () => {
    const [data, setData] = useState(null)
    const { handleGetWishlist } = useWishlist();

    const fetchData = async() => {
        await handleGetWishlist().then((res) => setData(res));
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    console.log(data)
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}

export default Wishlist
