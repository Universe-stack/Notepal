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