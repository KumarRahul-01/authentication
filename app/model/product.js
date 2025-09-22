const mongoose= require('mongoose');

const productSchema= new mongoose.Schema({
    productName:{type:String,require:true},
    price:{type:Number,require:true},
    createdBy:{type:mongoose.Types.ObjectId,ref:'User'},
})

module.exports=mongoose.model('Products',productSchema)