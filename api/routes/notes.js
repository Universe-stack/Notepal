import express, { Router } from "express";
import { nextTick } from "process";
import { createNote,deleteNote,getAllNotes,updateNote,tryNote } from "../controllers/note.js";
import Note from "../models/Note.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const notesRouter = express.Router();

//try
notesRouter.get("/try", tryNote)

//create
notesRouter.post("/new", createNote)

//update
notesRouter.put("/:id",verifyAdmin, updateNote)

//delete
notesRouter.delete("/:id", deleteNote)

//get
notesRouter.get("/:id", async(req,res)=>{
    try{
        const singleNote = await Note.findById(req.params.id);
        res.status(200).json(singleNote);
    }catch(e){
        next(e)
    }
})

//getAll
notesRouter.get("/", getAllNotes)

export default notesRouter;