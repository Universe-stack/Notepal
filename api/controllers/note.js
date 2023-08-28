//The controller takes care of all the logic that is supposed to be in the router requsts-post,put,delete,get
import Note from "../models/Note.js";
import path from "path"



export const tryNote = async(req,res,next)=> {
    res.send("Thiis is a trial");
    console.log('This is a trial');
}

export const createNote = async(req,res,next)=>{
    const uploadedFile = req.file;
    console.log("request",req)
    const user = req.user.userId;
        
    try{
        const newNote = new Note({
            title:req.body.title,
            message: req.body.message,
            images: uploadedFile.path,
            author: user,
            ...req.body
        });

        console.log('newNote', newNote)
        const savedNote = await newNote.save();
        res.status(200).json(savedNote);
        console.log('Form data received', savedNote)

    }catch(e){
        console.error('Error saving note:', e);
        res.status(500).json({ message: 'Error saving note' });
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
    const userId = req.user.userId;
    console.log(userId, "userID")

    try{
        Note.find({author:userId})
        .populate('author')
   .then((note)=> {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(note);
   },(err)=>next(err))
   .catch((err)=> next(err));
    }catch(e){
        next(e)
    }
}

export const deleteSelectedNotes= async(req,res,next)=>{
    const { ids } = req.body;
  // Check if the 'ids' property exists in the request body
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ error: 'Invalid request. Please provide an array of IDs to delete.' });
  }

  try {
    // Delete the selected notes from the database
    const deleteResult = await Note.deleteMany({ _id: { $in: ids } });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: 'No notes found with the provided IDs.' });
    }
    // Return a success response
    res.json({ message: 'Selected notes deleted successfully.' });
  } catch (error) {
    console.error('Error deleting notes:', error);
    res.status(500).json({ error: 'Failed to delete notes.' });
    next(error)
  }
} 

export const getPagNotes= async(req, res,next) => {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const size = parseInt(pageSize) || 10; // Default page size is 10, you can adjust it as needed
    
    console.log(page, pageSize);
    try{
        const allNotes = await Note.find();
        res.status(200).json(allNotes);
    }catch(e){
        next(e)
    }
    
  }