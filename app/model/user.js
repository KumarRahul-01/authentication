const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true},
    role:{type:String, enum:["Admin","User"], default:"User", require:true},
    password:{type:String},
    image:{type:String, require:true}
})

module.exports=mongoose.model("User",userSchema);