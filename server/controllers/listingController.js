import { v2 as cloudinary } from "cloudinary"
import Listing from "../models/Listing.js"
import User from "../models/User.js"
import { buildListingPayload, validateListingPayload } from "../utils/listing.js"

// Add Listing : /api/product/add
export const addProduct = async (req, res)=>{
    try {
        let productData = JSON.parse(req.body.productData)
        const payload = buildListingPayload(productData)

        const validationError = validateListingPayload(payload)
        if (validationError) {
            return res.json({success: false, message: validationError})
        }

        // Check if seller is verified
        const seller = await User.findById(payload.sellerId);
        if (!seller) {
            return res.json({success: false, message: "Seller not found"})
        }
        if (seller.verifiedStatus !== 'VERIFIED') {
            return res.json({success: false, message: "Your university email must be verified before you can list items"})
        }

        const images = req.files
        if (!images?.length) {
            return res.json({success: false, message: "Please upload at least one image"})
        }

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        await Listing.create({
            ...payload,
            image: imagesUrl
        })

        res.json({success: true, message: "Listing Added"})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get Listings : /api/product/list
export const productList = async (req, res)=>{
    try {
        const products = await Listing.find({}).populate('sellerId', 'name email universityEmail')
        res.json({success: true, products})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get single Listing : /api/product/id
export const productById = async (req, res)=>{
    try {
        const { id } = req.body
        const product = await Listing.findById(id).populate('sellerId', 'name email universityEmail')
        res.json({success: true, product})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Change Listing status : /api/product/stock
export const changeStock = async (req, res)=>{
    try {
        const { id, status } = req.body
        await Listing.findByIdAndUpdate(id, {status})
        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
