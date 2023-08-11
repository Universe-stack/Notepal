import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";



export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });

        await newUser.save();
        res.status(200).json("New user has been created");
        console.log('New user has been created');
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json("Registration failed"); // Sending a more informative error response
    }
}

//login
export const login=async(req,res,next)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        if(!user) return next(createError(404,"user not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect)  return next(createError(400,"wrong password or username"));

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT_KEY)

        const {password, isAdmin,...otherDetails} = user._doc;
        res
        .cookie("access_token",token,{httpOnly:true})
        .status(200)
        .json({details:{...otherDetails},isAdmin,password})
    }catch(e){
        next(e);
    }
}