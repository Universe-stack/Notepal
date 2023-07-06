import express, { Router } from "express";
import { deleteUser,getAllUsers,updateUser,getUser} from "../controllers/user.js";
import User from "../models/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const usersRouter = express.Router();

//check auth

// usersRouter.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user, you're logged in")
// })

// //check user of account
// usersRouter.get("/checkuser",verifyUser,(req,res,next)=>{
//     res.send("hello user, you're logged in and can delete your account")
// })

// //check admin
// usersRouter.get("/checkadmin",verifyAdmin,(req,res,next)=>{
//     res.send("hello admin, you're logged in and can delete all account")
// })

//update
usersRouter.put("/:id", verifyUser, updateUser)

//delete
usersRouter.delete("/:id",verifyUser, deleteUser)

//get
usersRouter.get("/:id",verifyUser, getUser)

//getAll
usersRouter.get("/",verifyAdmin, getAllUsers)

export default usersRouter;