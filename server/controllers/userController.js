import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isUniversityEmail, universityEmailErrorMessage } from '../utils/universityEmail.js';

const publicUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    universityEmail: user.universityEmail,
    campus: user.campus,
    department: user.department,
    verifiedStatus: user.verifiedStatus,
})

const setAuthCookie = (res, userId) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

// Register User : /api/user/register
export const register = async (req, res)=>{
    try {
        const { name, email, universityEmail, password, campus, department } = req.body;

        if(!name || !email || !universityEmail || !password || !campus || !department){
            return res.json({success: false, message: 'Missing Details'})
        }

        if(!isUniversityEmail(universityEmail)){
            return res.json({success: false, message: universityEmailErrorMessage()})
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedUniversityEmail = universityEmail.trim().toLowerCase();

        const existingUser = await User.findOne({$or: [{email: normalizedEmail}, {universityEmail: normalizedUniversityEmail}]})

        if(existingUser)
            return res.json({success: false, message: 'User already exists'})

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email: normalizedEmail,
            universityEmail: normalizedUniversityEmail,
            password: hashedPassword,
            campus: campus.trim(),
            department: department.trim(),
            verifiedStatus: 'VERIFIED', // Auto-verify since university email validation passed
        })

        setAuthCookie(res, user._id)

        return res.json({success: true, user: publicUser(user)})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Login User : /api/user/login

export const login = async (req, res)=>{
    try {
        const { email, password } = req.body;

        if(!email || !password)
            return res.json({success: false, message: 'Email and password are required'});

        const normalizedEmail = email.trim().toLowerCase();

        // Allow login with either email or universityEmail
        const user = await User.findOne({
            $or: [
                { email: normalizedEmail },
                { universityEmail: normalizedEmail }
            ]
        });

        if(!user){
            return res.json({success: false, message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch)
            return res.json({success: false, message: 'Invalid email or password'});

        setAuthCookie(res, user._id)

        return res.json({success: true, user: publicUser(user)})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// Check Auth : /api/user/is-auth
export const isAuth = async (req, res)=>{
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password")
        return res.json({success: true, user})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Logout User : /api/user/logout

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
