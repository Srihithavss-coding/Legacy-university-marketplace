import mongoose from "mongoose";
import { CONDITIONS, GEAR_TYPES, LAB_SIZES, PRODUCT_CATEGORY_PATHS } from "../utils/listing.js";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: {type: Array, required: true},
    price: {type: Number, required: true },
    offerPrice: {type: Number, required: true },
    image: {type: Array, required: true },
    category: {type: String, required: true, enum: PRODUCT_CATEGORY_PATHS },
    campus: {type: String, required: true },
    condition: {type: String, required: true, enum: CONDITIONS },
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
    inStock: {type: Boolean, default: true },
}, { timestamps: true})

const Product = mongoose.models.product || mongoose.model('product', productSchema)

export default Product
