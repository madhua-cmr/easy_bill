
const adminRoute = (req,res,next) => {
 console.log(req.user.role);
  if(!req.user||req.user.role!=="admin"){
    return res.status(401).json({success:false,error:"Access denied Admin only"});
  }else{
    next();
  }
}

export default adminRoute
