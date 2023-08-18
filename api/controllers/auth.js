import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



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

        // Generate a JWT token for the new user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY);

        // Send the token to the client
        res.status(201).json({ token });

        console.log('New user has been created and signed in');
        console.log(token);
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

//Auth middleware
export const authenticateJWT = async (req, res, next) => {
    console.log(req.headers,"req")
    const authHeader = req.headers['authorization']; // Use square brackets to access the header field
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
  
    const token = authHeader.split(' ')[1]; // Extract the token after removing "Bearer "
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY); // Replace 'your-secret-key' with your actual secret key
      req.user = decoded; // This sets the user's information in req.user
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
  