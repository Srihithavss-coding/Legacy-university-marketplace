import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children})=>{

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})

    const [searchQuery, setSearchQuery] = useState({})

  // Fetch Seller Status
  const fetchSeller = async ()=>{
    try {
        const {data} = await axios.get('/api/seller/is-auth');
        if(data.success){
            setIsSeller(true)
        }else{
            setIsSeller(false)
        }
    } catch (error) {
        setIsSeller(false)
    }
  }

    // Fetch User Auth Status and User Data
const fetchUser = async ()=>{
    try {
        const {data} = await axios.get('api/user/is-auth');
        if (data.success){
            setUser(data.user)
        }
    } catch (error) {
        setUser(null)
    }
}



    // Fetch All Products
    const fetchProducts = async ()=>{
        try {
            const { data } = await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Cart functions
    const addToCart = (itemId) => {
        setCartItems(prev => ({...prev, [itemId]: (prev[itemId] || 0) + 1}))
    }

    const removeFromCart = (itemId) => {
        setCartItems(prev => {
            const newCart = {...prev}
            delete newCart[itemId]
            return newCart
        })
    }

    const getCartCount = () => {
        return Object.values(cartItems).reduce((a, b) => a + b, 0)
    }

    const getCartAmount = () => {
        let totalAmount = 0
        for(const items in cartItems){
            for(let i = 0; i < cartItems[items]; i++){
                try {
                    const itemInfo = products.find((product) => product._id === items)
                    if(itemInfo) {
                        totalAmount += itemInfo.offerPrice || itemInfo.price
                    }
                } catch (error) {
                    console.error('Error calculating cart amount:', error)
                }
            }
        }
        return totalAmount
    }

    const updateCartItem = (itemId, quantity) => {
        setCartItems(prev => ({...prev, [itemId]: quantity}))
    }

    const logout = async () => {
        try {
            await axios.post('/api/user/logout')
            setUser(null)
            setCartItems({})
            setIsSeller(false)
            toast.success('Logged out successfully')
            navigate('/')
        } catch (error) {
            toast.error(error.message)
        }
    }


    useEffect(()=>{
        fetchUser()
        fetchSeller()
        fetchProducts()
    },[])

    const value = {navigate, user, setUser, setIsSeller, isSeller,
        showUserLogin, setShowUserLogin, products, currency, searchQuery, setSearchQuery, axios, fetchProducts, cartItems, addToCart, removeFromCart, getCartCount, getCartAmount, updateCartItem, logout
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}
