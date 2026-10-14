import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'
import { categories } from '../assets/assets'

const AllProducts = () => {

    const {products, searchQuery } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedCampus, setSelectedCampus] = useState('All')

    const campuses = [...new Set(products.map(p => p.campus).filter(Boolean))]

    useEffect(()=>{
        let result = products

        if(searchQuery.length > 0){
            result = result.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        if(selectedCategory !== 'All'){
            result = result.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase())
        }

        if(selectedCampus !== 'All'){
            result = result.filter(product => product.campus === selectedCampus)
        }

        setFilteredProducts(result)
    },[products, searchQuery, selectedCategory, selectedCampus])

  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Listings</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      <div className='flex flex-wrap gap-4 mt-6 mb-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded outline-none focus:border-primary'
          >
            <option value='All'>All Categories</option>
            {categories.map(cat => (
              <option key={cat.path} value={cat.path}>{cat.text}</option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Campus</label>
          <select
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className='px-3 py-2 border border-gray-300 rounded outline-none focus:border-primary'
          >
            <option value='All'>All Campuses</option>
            {campuses.map(campus => (
              <option key={campus} value={campus}>{campus}</option>
            ))}
          </select>
        </div>
      </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5'>
           {filteredProducts.filter((product)=> product.status !== 'SOLD').map((product, index)=>(
            <ProductCard key={index} product={product}/>
           ))}
        </div>

        {filteredProducts.filter((product)=> product.status !== 'SOLD').length === 0 && (
          <div className='flex items-center justify-center h-[40vh]'>
            <p className='text-xl font-medium text-gray-500'>No listings found matching your filters.</p>
          </div>
        )}

    </div>
  )
}

export default AllProducts
