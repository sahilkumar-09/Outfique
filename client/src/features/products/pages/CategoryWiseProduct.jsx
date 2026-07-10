import React, { useEffect } from 'react'
import { useProduct } from '../hooks/useProduct'
import { useParams } from 'react-router'
import Product from '../components/Product'

const CategoryWiseProduct = () => {
    const { handleGetProductBySlug } = useProduct()
    const [productData, setProductData] = React.useState([])
    const { slug } = useParams()
    
    const fetchProductData = async () => {
        const res = await handleGetProductBySlug(slug)
        setProductData(res)
    }
    useEffect(() => {
        if (slug) {
            fetchProductData()
        }
    }, [slug])

    if (productData.length === 0) {
        return (
            <div className='flex justify-center items-center h-[70vh]'>
                <p className='text-gray-500 text-lg'>No products found in this category.</p>
            </div>
        )
    }

  return (
      <div className='flex flex-col gap-5 px-4'>
          <Product />
    </div>
  )
}

export default CategoryWiseProduct