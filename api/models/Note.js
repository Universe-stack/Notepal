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
       type:String
    },
    date: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateSubmit: Date
})


export default mongoose.model("Note",NoteSchema)