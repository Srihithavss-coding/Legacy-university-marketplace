import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { getCardHighlight } from "../utils/listing";


const ProductCard = ({product}) => {
    const {currency, navigate} = useAppContext()
    const highlight = getCardHighlight(product)


    return product && (
        <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
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
