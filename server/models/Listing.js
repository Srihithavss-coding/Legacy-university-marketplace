import mongoose from "mongoose";
import { CONDITIONS, GEAR_TYPES, LAB_SIZES, PRODUCT_CATEGORY_PATHS } from "../utils/listing.js";

const listingSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: {type: Array, required: true},
    price: {type: Number, required: true },
    image: {type: Array, required: true },
    category: {type: String, required: true, enum: PRODUCT_CATEGORY_PATHS },
    campus: {type: String, required: true },
condition: {
  type: String,
  enum: ['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'Brand New', 'Gently Used', 'Like New', 'Good', 'Fair'],
  required: true
},
    sellerId: {type: String, required: true, ref: 'user'},
    status: {type: String, enum: ['ACTIVE', 'SOLD', 'RESERVED'], default: 'ACTIVE'},
    author: {type: String},
    edition: {type: String},
    courseCode: {type: String},
    semester: {type: String},
    professor: {type: String},
    academicYear: {type: String},
    size: {type: String, enum: LAB_SIZES },
    department: {type: String},
    bicycleBrand: {type: String},
    gearType: {type: String, enum: GEAR_TYPES },
    lockIncluded: {type: Boolean},
}, { timestamps: true})

const Listing = mongoose.models.listing || mongoose.model('listing', listingSchema)

export default Listing
