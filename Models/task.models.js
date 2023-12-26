const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    title:String,
    category:{type: String,
        enum: ["medium", "lower","upper"],
        default: "medium"},
        createdby:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
})

const task=mongoose.model("task",taskSchema)
module.exports=task