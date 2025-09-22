const mongoose=require('mongoose');

const studentSchema= new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    age:{type:String,require:true},
    city:{type:String,require:true},
    isVerified:{type:Boolean,default:false}
});

module.exports=mongoose.model("Student",studentSchema);