import mongoose from "mongoose";
const {Schema} = mongoose;

const NoteSchema= new Schema({
    title: {
        type:String,
    },
    message: {
        type:String,
    },
    type: {
        type:String,
    },
    images:{
        type: [String]
    }
})


export default mongoose.model("Note",NoteSchema)