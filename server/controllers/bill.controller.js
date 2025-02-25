import Bill from "../models/billModel.js";
import Customer from "../models/customerModel.js";
import Product from "../models/productModel.js";

export const getBills=async(req,res)=>{
try {
const bills=await Bill.find({});
return res.status(200).json({success:true,bills});

    
} catch (error) {
    console.log("Error in getBills controller",error.message);
    return res.status(500).json({success:false,error:error.message})
}
}



export const addBill=async(req,res)=>{
    console.log(req.body);
    const data=req.body;
  
    try {
    
    const mybill=new Bill(data);
    
  await mybill.save();
    const cust=await Customer.findById(data.customerId);
    
    cust.balanceAmount=mybill.totalAmount-mybill.paid;
    await cust.save()
        return res.status(200).json({success:true,message:"Bill created successfully"});
   
    
    } catch (error) {
        console.log("Error in addBills controller",error.message);
        return res.status(500).json({success:false,error:error.message});

    }
}

export const deleteBill=async(req,res)=>{
    const id=req.params.id;
    try {
      const existbill=await Bill.findById(id);
if(!existbill){
    return res.status(400).json({success:false,error:"Mou not exist"});
}
    await Bill.findByIdAndDelete(id);
    return res.status(200).json({success:true,message:"Bill deleted successfully"});    

    } catch (error) {
        console.log("Error in deleteBill controller",error.message);
        return res.status(500).json({success:false,error:error.message});
    }
}


export const editBill=async(req,res)=>{
    const id=req.params.id;
    const bill=req.body;

    try {
    const existBill=await Bill.findById(id);
    if(!existBill){
        return res.status(400).json({success:false,error:"Bill not exist"});

    }
    
    const updatedBill=await Bill.findByIdAndUpdate({id,bill,new:true});
    if(updatedBill){
        return res.status(200).json({success:true,message:"Bill updated successfully",updatedBill});
    }
    } catch (error) {
        console.log("Error in editBill controller");
        return res.status(500).json({success:false,error:error.message});
    }
}


export const addProduct=async(req,res)=>{
    const data=req.body;
    try{
   const existproduct=await Product.findOne({$or:[{uniquecode:data.uniquecode},{name:data.name}]});
   if(existproduct){
    if(existproduct.name===data.name){
        return res.status(409).json({success:false,error:"Product already exist"});
    }
    
        return res.status(409).json({success:false,error:"Code already exist"});
    
    

   }
    const product=new Product(data);
   await product.save();
    return res.status(200).json({success:true,message:"Product Added successfully"});
   
    }catch(err){
        console.log("Error in add product controller",err.message);
        return res.status(500).json({success:false,error:err.message});
    }
}

export const getProduct=async(req,res)=>{
    try {
    const products=await Product.find()||[];
    if(products){

    
    return res.status(200).json({success:true,products:products});
    }
        
    } catch (error) {
        console.log("Error in getBills controller",error.message);
        return res.status(500).json({success:false,error:error.message})
    }
    }
    

    export const getProductName=async(req,res)=>{
        const {id}=req.params;
        
        try {
        const product=await Product.findById(id);
        
    if (!product) {
        return res.status(404).json({ success: false, error: "Product not found" });
      }
      
    
        
        return res.status(200).json({success:true,productName:product.name});
       
            
        } catch (error) {
            console.log("Error in getBills controller",error.message);
            return res.status(500).json({success:false,error:error.message})
        }
        }
        
    export const getBill=async(req,res)=>{
        let id=req.params.id;
      
try {
    const bill=await Bill.findById(id).populate("items.code").populate("customerId");
  
    if(bill){
        return res.status(200).json({success:true,bill});
    }
} catch (error) {
    console.log("Error in getBill controller",error.message);
    return res.status(500).json({success:false,error:error.message})
}
    }