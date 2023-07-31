import express, { Router } from "express";
import { nextTick } from "process";
import { createNote,deleteNote,getAllNotes,updateNote,tryNote,deleteSelectedNotes,getPagNotes } from "../controllers/note.js";
import Note from "../models/Note.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const notesRouter = express.Router();


//verifyNote
//try
notesRouter.get("/try", tryNote)

//create
notesRouter.post("/new", createNote)

//update
notesRouter.put("/:id", updateNote)

//delete
notesRouter.delete("/checked", deleteSelectedNotes);

//Paginated posts
notesRouter.get("/allPosts",getPagNotes);

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
notesRouter.get("/", getAllNotes);





export default notesRouter;