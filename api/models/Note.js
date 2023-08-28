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
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    dateSubmit: Date
})


export default mongoose.model("Note",NoteSchema)