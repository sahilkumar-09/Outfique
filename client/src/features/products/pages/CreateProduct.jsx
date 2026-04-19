import React, { useState } from 'react';
import { useProduct } from '../hooks/useProduct';
import {useNavigate} from "react-router"

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "",
  })

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 7) {
      alert('You can only select up to 7 images in total.');
      e.target.value = '';
      return; 
    }
    
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    
    setImages(prev => [...prev, ...newImages]);
    e.target.value = ''; 
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[indexToRemove].url);
      newImages.splice(indexToRemove, 1);
      return newImages;
    });
  };

  const {handleCreateProducts} = useProduct()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    
    const fd = new FormData()
    fd.append("title", formData.title)
    fd.append("description", formData.description)
    fd.append("amount", formData.amount)
    fd.append("currency", formData.currency)
    
    images.forEach(img => {
      fd.append("productImages", img.file)
    })

    try {
      const data = await handleCreateProducts(fd)
      if (data) {
        navigate("/")
      } else {
        navigate("/seller/create-product")
      }
      
      setFormData({
        title: "",
        description: "",
        amount: "",
        currency: "",
      })
      setImages([])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 font-sans selection:bg-yellow-500/30">
      <div className="w-full max-w-4xl bg-[#111111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        <div className="relative z-10 flex flex-col gap-10">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Create Product
            </h1>
            <p className="text-gray-400 text-lg">Add a new item to your inventory</p>
          </div>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8" onSubmit={submitHandler}>
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2 flex flex-col">
                <label htmlFor="title" className="text-sm font-medium text-gray-300 ml-1">Product Title</label>
                <input 
                  type="text" 
                  name="title" 
                  id="title" 
                  value={formData.title}
                  onChange={onChangeHandler}
                  className="bg-white/5 border border-white/10 focus:border-yellow-500 focus:bg-white/10 rounded-xl px-4 py-3 outline-none transition-all duration-300 text-white placeholder-gray-500 w-full"
                  placeholder="e.g. Minimalist Watch" 
                />
              </div>

              <div className="space-y-2 flex flex-col">
                <label htmlFor="description" className="text-sm font-medium text-gray-300 ml-1">Description</label>
                <textarea 
                  name="description" 
                  id="description" 
                  rows="4"
                  value={formData.description}
                  onChange={onChangeHandler}
                  className="bg-white/5 border border-white/10 focus:border-yellow-500 focus:bg-white/10 rounded-xl px-4 py-3 outline-none transition-all duration-300 text-white placeholder-gray-500 w-full resize-none"
                  placeholder="Detailed description of the product..."
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="amount" className="text-sm font-medium text-gray-300 ml-1">amount ($)</label>
                  <input 
                    type="number" 
                    name="amount" 
                    id="amount" 
                    value={formData.amount}
                    onChange={onChangeHandler}
                    className="bg-white/5 border border-white/10 focus:border-yellow-500 focus:bg-white/10 rounded-xl px-4 py-3 outline-none transition-all duration-300 text-white placeholder-gray-500 w-full"
                    placeholder="0.00" 
                  />
                </div>
                <div className="space-y-2 flex flex-col">
                  <label htmlFor="currency" className="text-sm font-medium text-gray-300 ml-1">Currency</label>
                  <select 
                    name="currency" 
                    id="currency"
                    value={formData.currency}
                    onChange={onChangeHandler}
                    className="bg-white/5 border border-white/10 focus:border-yellow-500 focus:bg-white/10 rounded-xl px-4 py-3 outline-none transition-all duration-300 text-white w-full appearance-none group"
                  >
                    <option value="" className="text-black">Select Currency</option>
                    <option value="INR" className="text-black">INR (₹)</option>
                    <option value="USD" className="text-black">USD ($)</option>
                    <option value="EUR" className="text-black">EUR (€)</option>
                    <option value="GBP" className="text-black">GBP (£)</option>
                    <option value="JPY" className="text-black">JPY (¥)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-2 flex flex-col h-full">
                <label htmlFor="images" className="text-sm font-medium text-gray-300 ml-1">Product Images ({images.length}/7)</label>
                <div className="flex flex-col gap-4 grow">
                  <div className="flex items-center justify-center border-2 border-dashed border-white/20 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer relative group min-h-[160px]">
                    <input 
                      type="file" 
                      name="productImages" 
                      id="images" 
                      multiple 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3 group-hover:scale-105 transition-transform duration-300">
                      <div className="p-4 bg-yellow-500/20 rounded-full text-yellow-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-300 font-medium tracking-wide">Drop images here</p>
                        <p className="text-gray-500 text-sm mt-1">or click to browse</p>
                      </div>
                    </div>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-4 gap-3">
                      {images.map((img, index) => (
                        <div key={index} className="relative group aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
                          <img src={img.url} alt={`preview ${index}`} className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-yellow-500/30 transform hover:-translate-y-1 transition-all duration-300 outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#111111]"
                >
                  Create Product
                  </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct;