//The controller takes care of all the logic that is supposed to be in the router requsts-post,put,delete,get
import Note from "../models/Note.js";

export const tryNote = async(req,res,next)=> {
    res.send("Thiis is a trial");
    console.log('This is a trial');
}

export const createNote = async(req,res,next)=>{
    const newNote = new Note(req.body);
    
    try{
        const savedNote = newNote.save();
        res.status(200).json(savedNote);
        console.log('Form data received')

    }catch(e){
        next(e)
    }
}

export const updateNote = async(req,res,next)=>{
    try{
        const updatedNote= await Note.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
        )
        res.status(200).json(updatedNote);
    }catch(e){
        next(e)
    }
}

export const deleteNote= async(req,res,next)=>{
    try{
        await Note.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Hotel's been deleted");
    }catch(e){
        next(e)
    }
}

export const getAllNotes= async(req,res,next)=>{
    //const failed = true;
    //if(failed) return next(createError(401,"You're not authenticated!"))

    try{
        const allNotes = await Note.find();
        res.status(200).json(allNotes);
    }catch(e){
        next(e)
    }
}