//first, install dependencies
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import notesRoute from "./routes/notes.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



//call dependencies
const app = express();
dotenv.config()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//connect db
const connect = ()=>{
    try{
        mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb")
    }catch(e){
        handleError(e);
    } 
}
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("mongmongoDB connected")
})



//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/auth",authRoute);
app.use("/notes",notesRoute);
app.use("/users",userRoute);


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage= err.message || "something went wrong"
    
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    });
})


app.listen(8800, (res)=> {
    connect();
    console.log("connected to backend")
})