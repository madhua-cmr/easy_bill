import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
   name:{
        type:String,
        required:true,
        unique:true,
    },
   uniquecode:{
         type:Number,
         required:true,
         unique:true,
   }
})

const Product= mongoose.model("Product",productSchema);

export default Product;