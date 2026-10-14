import React from 'react'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className='relative bg-gradient-to-r from-blue-600 to-blue-800 min-h-[400px] md:min-h-[500px]'>
      <div className='absolute inset-0 flex flex-col items-center md:items-start justify-center px-4 md:pl-18 lg:pl-24'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 text-white'
        >Buy & Sell on Campus, Save Money! </h1>
        <p className='text-white/80 text-center md:text-left mt-4 max-w-md text-sm md:text-base'>
          Your trusted university marketplace for textbooks, lab coats, notes, bicycles, and more.
        </p>

      <div className='flex items-center mt-6 font-medium'>
        <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-white text-primary hover:bg-gray-100 transition rounded cursor-pointer'>
        Browse Listings
        </Link>

        <Link to={"/sell"} className='group hidden md:flex items-center gap-2 px-9 py-3 text-white hover:text-white/80 cursor-pointer'>
        Sell an Item
        <span className='transition group-hover:translate-x-1'>→</span>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default MainBanner
