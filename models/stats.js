import mongoose from "mongoose";

const schema = new mongoose.Schema({

    users :{
        type:String,
        required:true
    },
    subscription :{
        type:String,
        required:true
    },
    views :{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    },
})

export const Stats = mongoose.model("Stats",schema);