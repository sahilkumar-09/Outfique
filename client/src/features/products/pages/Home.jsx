import React, { useEffect, useState } from 'react'
import { useProduct } from '../hooks/useProduct';
import Category from '../components/Category';
import CategoryCarousel from '../components/CategoryCarousel';
import Product from '../components/Product';

const Home = () => {

  const { handleGetAllProducts } = useProduct();

  const [productData, setProductData] = useState(null)

  const fetchProductData = async () => {
    const res = await handleGetAllProducts()
    setProductData(res)
  }

  useEffect(() => {
      fetchProductData()
  }, [])
  
  return (
    <div className='flex flex-col gap-5'>
      <Category />
      <CategoryCarousel />
      <Product />
    </div>
  )
}

export default Home