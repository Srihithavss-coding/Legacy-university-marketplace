import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { getProductHighlights } from "../utils/listing";
import toast from "react-hot-toast";
import ChatModal from "../components/ChatModal";

const ProductDetails = () => {

    const {products, navigate, currency, user, cartItems, addToCart, removeFromCart} = useAppContext()
    const {id} = useParams()
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const product = products.find((item)=> item._id === id);
    const highlights = getProductHighlights(product);
    const isSaved = cartItems[product?._id]

    const toggleSave = () => {
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

    useEffect(()=>{
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=> product.category === item.category && item._id !== product._id)
            setRelatedProducts(productsCopy.slice(0,5))
        }
    },[products, product])

    useEffect(()=>{
        setThumbnail(product?.image[0] ? product.image[0] : null)
    },[product])

    const handleContactSeller = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user._id === product.sellerId) {
            toast.error('You cannot message yourself!');
            return;
        }
        setIsChatOpen(true);
    };

    return product && (
        <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Listings</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <div className="flex items-start justify-between">
                        <h1 className="text-3xl font-medium">{product.name}</h1>
                        <button
                            onClick={toggleSave}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                        >
                            <svg className={`w-6 h-6 ${isSaved ? 'text-red-500 fill-current' : 'text-gray-400'} hover:text-red-500 transition`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06a5.5 5.5 0 0 0 7.78-7.78L12 10.67z" />
                            </svg>
                        </button>
                    </div>

                    {highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {highlights.map((item) => (
                                <span key={item} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                    {item}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-6">
                        <p className="text-2xl font-medium">Price: {currency}{product.price}</p>
                        <span className="text-gray-500/70">(Pickup from campus)</span>
                    </div>

                    {product.campus && (
                        <p className="text-sm text-gray-500 mt-4">Pickup location: <span className="text-gray-800 font-medium">{product.campus}</span></p>
                    )}

                    {product.condition && (
                        <p className="text-sm text-gray-500 mt-2">Condition: <span className="text-gray-800 font-medium">{product.condition}</span></p>
                    )}

                    <p className="text-base font-medium mt-6">About Item</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={handleContactSeller} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
                            Contact Seller
                        </button>
                    </div>
                </div>
            </div>
            {/* ---------- related products -------------- */}
            <div className="flex flex-col items-center mt-20">
                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium">Related Listings</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
                    {relatedProducts.filter((product)=>product.status !== 'SOLD').map((product, index)=>(
                        <ProductCard key={index} product={product}/>
                    ))}
                </div>
                <button onClick={()=> {navigate('/products'); scrollTo(0,0)}} className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition">See more</button>
            </div>

            <ChatModal
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                listingId={product._id}
                listingName={product.name}
                listingImage={product.image[0]}
                otherUserId={product.sellerId?._id || product.sellerId}
                otherUserName={product.sellerName || 'Seller'}
            />
        </div>
    );
};


export default ProductDetails