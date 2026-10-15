import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { getCardHighlight } from "../utils/listing";
import toast from "react-hot-toast";


const ProductCard = ({product}) => {
    const {currency, navigate, cartItems, addToCart, removeFromCart, user} = useAppContext()
    const highlight = getCardHighlight(product)
    const isSaved = cartItems[product._id]

    const toggleSave = (e) => {
        e.stopPropagation();
        if (!user) {
            toast.error('Please log in to save items');
            return;
        }

        if (isSaved) {
            removeFromCart(product._id);
            toast.success('Removed from My Saved Items');
        } else {
            addToCart(product._id);
            toast.success('Saved to My Saved Items');
        }
    }


    return product && (
        <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full relative">
            <button
                onClick={toggleSave}
                className="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-all"
            >
                <svg className={`w-5 h-5 ${isSaved ? 'text-red-500 fill-current' : 'text-gray-400'} hover:text-red-500 transition`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06a5.5 5.5 0 0 0 7.78-7.78L12 10.67z" />
                </svg>
            </button>
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                {highlight && (
                    <p className="text-primary/80 text-xs font-medium truncate mt-0.5">{highlight}</p>
                )}
                {product.condition && (
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {product.condition}
                    </span>
                )}
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}{product.price}
                    </p>
                    <div onClick={(e) => { e.stopPropagation(); navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0); }} className="text-primary">
                        <button className="flex items-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer justify-center" >
                            View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
