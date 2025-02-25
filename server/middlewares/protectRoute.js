import jwt from "jsonwebtoken";
import "dotenv/config";


export const protectRoute=async(req,res,next)=>{
  
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({success:false,error:"Token not provided,UnAuthenticated User"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        
        req.user=decoded.user;
        next();
    }catch(error){
        console.log("Error in protectRoute",error.message);
        return res.status(401).json({success:false,message:error.message})
    }
  

}