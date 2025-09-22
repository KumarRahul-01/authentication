const Product = require("../model/product");
const ProductDetails = require("../model/productDetails");
const ProductImg = require("../model/productImg");

class productController {
  async createProducts(req, res) {
    try {
      const { productName, price, createdBy } = req.body;
      const addPoducts = await Product({
        productName,
        price,
        createdBy,
      });
      addPoducts.save();
      res.status(201).json({
        status: true,
        message: "Product added",
        data: addPoducts,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
  async productDetails(req, res) {
    try {
      const { size, color, productId, createdBy } = req.body;
      const addDetails = await ProductDetails({
        size,
        color,
        productId,
        createdBy,
      });
      addDetails.save();
      res.status(201).json({
        status: true,
        message: "Product Detail added",
        data: addDetails,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async productImg(req,res){
    try {
      const {img,productId}=req.body;
      const addImg= await ProductImg({
        img,productId
      })
      addImg.save();
      res.status(201).json({
        status:true,
        message:"Product image added",
        data:addImg
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
      
    }
  }

  async getProducts(req, res) {
    try {
      const allProducts = await ProductDetails.find().populate({
        path: "productId",
        select: "productName price",
      });
      res.status(200).json({
        status: true,
        message: "get Products",
        total: allProducts.length,
        data: allProducts,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getProductAgg(req, res) {
    try {
      const allProducts = await Product.aggregate([
        {
          $lookup: {
            from: "productsdetails",
            localField: "_id",
            foreignField: "product",
            as: "productDetails",
          },
        },
        {
          $lookup:{
            from:"productimgs",
            localField:"_id",
            foreignField:"productId",
            as:"productImage"
          }
        },
        {
          $project: {
            productName: 1,
            price: 1,
            productDetails: {
              size: "$productDetails.size",
              color: "$productDetails.color",
            },
            productImage: { img: "$productImage.img" },
          },
        },
      ]);
      res.status(200).json({
        status: true,
        message: "get Products",
        total: allProducts.length,
        data: allProducts,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async updateProduct(req,res){
    try {
      const {id}=req.params;
      const {productName,price}=req.body;
      const updateData= await Product.findByIdAndUpdate(id,{productName,price},{new:true});
      res.status(200).json({
        status:true,
        message:"Product updated",
        data:updateData
      })

      
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message,
      });
      
    }
  }
}
module.exports = new productController();
