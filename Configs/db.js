const mongoose=require("mongoose")

const database=async()=>{
    await mongoose.connect("mongodb+srv://jeel:narola@cluster0.dgwjmgh.mongodb.net/test?retryWrites=true&w=majority")
    console.log("database connect !");
}

module.exports=database