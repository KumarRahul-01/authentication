const mongoose= require('mongoose');

const productDetails= new mongoose.Schema({
    size:{type:String,require:true},
    color:{type:String,require:true},
    productId:{type:mongoose.Types.ObjectId,ref:'Products'},
    createdBy:{type:mongoose.Types.ObjectId,ref:'User'}
})

module.exports=mongoose.model('ProductsDetails',productDetails)