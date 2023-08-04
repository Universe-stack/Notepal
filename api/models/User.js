import mongoose from "mongoose";
const {Schema} = mongoose;


var User= new Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String
    },
    images:{
        type: String,
    },
    facebookId:String,
    isAdmin: {
        type: Boolean,
        default:false
    }
},
    {timestamps:true}
)
export default mongoose.model('User',User)