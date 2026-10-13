import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    universityEmail: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    campus: {type: String, required: true },
    department: {type: String, required: true },
    verifiedStatus: {type: String, enum: ['PENDING', 'VERIFIED', 'REJECTED'], default: 'PENDING'},
}, {minimize: false, timestamps: true})

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User
