import mongoose from "mongoose";

const customerSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
contact:{
    type:String,
    length:[10,"phno must be 10 digits"],
    required:true

},
balanceAmount:{
    type:Number,
    default:0
}


})
const Customer=mongoose.model("Customer",customerSchema);


export default Customer;