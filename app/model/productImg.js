const mongoose=require('mongoose');
const imgSchema=new mongoose.Schema({
    img:{type:String,required:true},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'Products'},

});
module.exports=mongoose.model('ProductImg',imgSchema);