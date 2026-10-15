import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const {user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, logout} = useAppContext();

    useEffect(()=>{
      if(searchQuery.length > 0){
        navigate("/products")
      }
    },[searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

      <NavLink to='/' onClick={()=> setOpen(false)} className="flex items-center gap-2">
        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">L</div>
        <span className="text-xl font-bold text-gray-800">Legacy</span>
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products'>All Listings</NavLink>
        <NavLink to='/sell' onClick={(e) => { if(!user) { e.preventDefault(); setShowUserLogin(true); } }}>Sell Item</NavLink>
        <NavLink to='/messages' onClick={(e) => { if(!user) { e.preventDefault(); setShowUserLogin(true); } }}>Messages</NavLink>
        <NavLink to='/contact'>Contact</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search listings" />
         <img src={assets.search_icon} alt='search' className='w-4 h-4'/>
        </div>

      {!user ? ( <button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
          Login
        </button>)
        :
        (
          <div className='relative group'>
            <img src={assets.profile_icon} className='w-10' alt="" />
            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-44 rounded-md text-sm z-40'>
              {user.campus && (
                <li className='px-3 pb-1.5 text-xs text-gray-500 border-b border-gray-100 mb-1'>
                  {user.campus}
                  {user.department ? ` · ${user.department}` : ''}
                </li>
              )}
              <li onClick={()=> navigate("/profile")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Profile</li>
              <li onClick={()=> navigate("/messages")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Messages</li>
              <li onClick={()=> navigate("/cart")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Saved Items</li>
              <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
            </ul>
          </div>
        )}
      </div>

<div className='flex items-center gap-6 sm:hidden'>
    <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
        <img  src={assets.menu_icon} alt='menu'/>
      </button>
</div>


      { open && (
        <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
        <NavLink to="/" onClick={()=> setOpen(false)}>Home</NavLink>
        <NavLink to="/products" onClick={()=> setOpen(false)}>All Listings</NavLink>
        <NavLink to="/sell" onClick={(e) => { if(!user) { e.preventDefault(); setOpen(false); setShowUserLogin(true); } else { setOpen(false); } }}>Sell Item</NavLink>
        <NavLink to="/messages" onClick={(e) => { if(!user) { e.preventDefault(); setOpen(false); setShowUserLogin(true); } else { setOpen(false); } }}>Messages</NavLink>
        {user &&
        <>
        <NavLink to="/profile" onClick={()=> setOpen(false)}>My Profile</NavLink>
        <NavLink to="/cart" onClick={()=> setOpen(false)}>My Saved Items</NavLink>
        </>
        }
        <NavLink to="/contact" onClick={()=> setOpen(false)}>Contact</NavLink>

        {!user ? (
          <button onClick={()=>{
            setOpen(false);
            setShowUserLogin(true);
          }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
          Login
        </button>
        ) : (
          <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
          Logout
        </button>
        )}

      </div>
      )}

    </nav>
  )
}

export default Navbar
