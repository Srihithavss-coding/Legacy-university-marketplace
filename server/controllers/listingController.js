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

        // Use userId from auth middleware instead of sellerId from form
        const sellerId = req.body.userId;
        if (!sellerId) {
            return res.json({success: false, message: "Not Authorized"})
        }

        // Check if seller is verified
        const seller = await User.findById(sellerId);
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

        // Upload images to Cloudinary with fallback for local testing
        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                try {
                    let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                    return result.secure_url
                } catch (error) {
                    console.log('Cloudinary upload failed, using fallback placeholder:', error.message);
                    // Fallback placeholder for local testing - clean blue box with icon
                    return 'https://via.placeholder.com/400x400/2563eb/ffffff?text=Product+Image';
                }
            })
        )

        await Listing.create({
            ...payload,
            sellerId: sellerId,
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
        const products = await Listing.find({status: 'ACTIVE'}).populate('sellerId', 'name email universityEmail')
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

// Mark Listing as Sold : /api/product/mark-sold
export const markAsSold = async (req, res)=>{
    try {
        const { id } = req.body
        await Listing.findByIdAndUpdate(id, {status: 'SOLD'})
        res.json({success: true, message: "Listing marked as sold"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Delete Listing : /api/product/delete/:id
export const deleteListing = async (req, res)=>{
    try {
        const { id } = req.params
        await Listing.findByIdAndDelete(id)
        res.json({success: true, message: "Listing deleted successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
