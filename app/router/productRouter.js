const express= require('express');
const productController = require('../controller/productController');

const router=express.Router();

router.post('/addProduct',productController.createProducts);
router.get('/getProduct',productController.getProducts);
router.post('/productDetails',productController.productDetails);
router.get('/getProductAgg',productController.getProductAgg);
router.post('/updateProduct/:id',productController.updateProduct);
router.post('/productImg',productController.productImg);

module.exports=router