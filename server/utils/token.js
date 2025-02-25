import jwt from "jsonwebtoken"
import "dotenv/config";
export const generateAndsetToken=async(res,user)=>{

const token=jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'5h'});

res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",
    sameSite:"Strict",
    maxAge:5*60*60*1000
});


}

