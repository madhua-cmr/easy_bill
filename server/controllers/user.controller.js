import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateAndsetToken } from "../utils/token.js";
export const loginUser=async(req,res)=>{
const data=req.body;
try{
    const user=await User.findOne({username:data.username});
        if(!user){
            return res.status(404).json({success:false,error:"User not exist"});
        }
        const comparePassword=await bcrypt.compare(data.password,user.password);

        if(!comparePassword){
            return res.status(400).json({success:false,error:"Enter correct password"});
        }

        generateAndsetToken(res,{id:user._id,role:user.role}); 
        return res.status(200).json({success:true,message:"User loggedIn successfully",user:{
            _id:user._id,
            name:user.name,
            username:user.username,
            role:user.role
        }});

}catch(error){
    console.log("Error in loginUser controller",error.message);
    return res.status(500).json({success:false,error:error.message});
}
}


export const signupUser=async(req,res)=>{
    console.log(req.body)
    const data=req.body;
    try{
        const user=await User.findOne({username:data.username});
        if(user){
            return res.status(400).json({success:false,error:"User already exist"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(data.password,salt);
        const newUser=new User({
            ...data,
            password:hashedPassword
        })
        await newUser.save();
        generateAndsetToken(res,{id:newUser._id,role:newUser.role}); 
        return res.status(200).json({success:true,message:"User created successfully",user:{
            _id:newUser._id,
            name:newUser.name,
            username:newUser.username,
            role:newUser.role
        }});
    
    }catch(error){
        console.log("Error in signupUser controller",error.message);
        return res.status(500).json({success:false,error:error.message});
    }
}


export const logoutUser=async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
        })
        return res.status(200).json({success:true,message:"Logged Out Successfully"});

    } catch (error) {
        console.log("Error in logout controller",error.message);
        return res.status(500).json({success:false,error:error.message});
    }
}

export const getUserProfile=async(req,res)=>{
    const userId=req.user?.id;
    try {
        if(!userId){
            return res.status(401).json({success:false,error:"Unauthenticated user"});  
        }
      const user=await User.findById(userId);
      if(!user){
    return res.status(404).json({success:false,error:"User not found"});
      }
      return res.status(200).json({success:true,user});


        
    } catch (error) {
        console.log("Error in getProfile controller",error.message);
        return res.status(500).json({success:false,error:error.message});
    }
}