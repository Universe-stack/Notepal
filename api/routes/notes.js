import express, { Router } from "express";
import { nextTick } from "process";
import { createNote,deleteNote,getAllNotes,updateNote,tryNote,deleteSelectedNotes,getPagNotes } from "../controllers/note.js";
import Note from "../models/Note.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import multer from "multer";
import path from "path";
import {authenticateJWT} from '../controllers/auth.js'; // Import your JWT authentication middleware

const notesRouter = express.Router();

// Set up Multer storage for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
  });

const upload = multer({storage:storage})


//verifyNote
//try
notesRouter.get("/try", tryNote)

//create
notesRouter.post("/new",upload.single('images'), express.static('uploads'),createNote)

//update
notesRouter.put("/:id", updateNote)

//delete
notesRouter.delete("/checked", deleteSelectedNotes);

//Paginated posts
notesRouter.get("/allPosts",authenticateJWT, getPagNotes);

notesRouter.delete("/:id", deleteNote)

//get
notesRouter.get("/:id", async(req,res,next)=>{
    try{
        const singleNote = await Note.findById(req.params.id);
        res.status(200).json(singleNote);
    }catch(e){
        next(e)
    }
})

//getAll
notesRouter.get("/", authenticateJWT, getAllNotes);





export default notesRouter;