import { useContext, useState } from "react"
import bg from "../assets/login.jpg"
import  toast  from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../Context/AppContextProvider"
import Loader from "./Loader"
const SignupPage = () => {
  const {loading,setLoading,setUser,setIsAdmin}=useContext(AppContext);
  const navigate=useNavigate();
  const [signvalues,setSignvalues]=useState({
 name:"",
 username:"",
 password:"",
  })

  const validate=()=>{
    if(/\d/.test(signvalues.name)){
      toast.error("Name should not contain numbers");
    }
    if(signvalues.name.length<3){
      toast.error("Name length should at least 3 characters");
    }
   
    if(signvalues.username.length<3||signvalues.username.length>20){
      toast.error("Username must be between 3 and 20 characters.");
      return false;
    }
    if(!/^[a-zA-Z0-9_.]+$/.test(signvalues.username)){
      toast.error("Username Only letters,numbers,dots and underscores are allowed");
      return false;
    }
    if(/^[_.]|[_.]$/.test(signvalues.username)){
      toast.error("Username cannot start or end with _ or .");
      return false;
    }
    if(/([_.])\1/.test(signvalues.username)){
      toast.error("Username cannot have consecutive_ or .");
    }
    if(!/(?=.*[A-Z])/.test(signvalues.password)){
      toast.error("Password should include atleast one Uppercase character")
      return false;
    }
    if(!/(?=.*[a-z])/.test(signvalues.password)){
      toast.error("Password should inlclude atleast one lowercase character");
      return false;
    }
    if(!/(?=.*\d)/.test(signvalues.password)){
      toast.error("Password should inlclude atleast one digit");
      return false;
    }
    if(!/(?=.*[@$!%*&?])/.test(signvalues.password)){
      toast.error("Password should inlclude atleast special character");
      return false;
    }
    if(!/^.{8,}$/.test(signvalues.password)){
     
        toast.error("Password length mustbe 8 or more");
        return false;
    
    }
    return true;
  }

  const handleSubmit=async()=>{
    if(!validate()){
      return;
    }
    setLoading(true);
try {
  console.log(signvalues)
  const res=await fetch("/api/user/signup",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
     
    },
    body:JSON.stringify(signvalues),
    credentials:"include"

  })
  const data=await res.json();
  if(!data.success){

    toast.error(data.error);
    return;
  }
  if(data.success){
    localStorage.setItem("user",JSON.stringify(data.user));
    setUser(data.user);
    if(data?.user?.role==="admin"){
      setIsAdmin(true);
    }
    toast.success(data.message);
    navigate("/");
  }

} catch (error) {
  console.log(error.message);
  toast.error(error.message);
}finally{
  setLoading(false);
}
  }

  if(loading){
    return <Loader/>
  }
  return (
 
   
    <div className="h-[633px] text-white w-full flex flex-col items-center justify-center  " >
      <img src={bg} className=" z-10 w-full h-full object-cover " alt="" />
    <div className=" absolute z-30 py-16 px-8 border-2  flex items-center flex-col gap-6 justify-center m-auto  border-slate-200 ring-1  ring-slate-200 rounded  w-1/2 max-sm:w-3/4 lg:w-1/4">
      <div>SignUp</div>
      <div className="flex flex-col gap-3">
    <label htmlFor="name">Name</label>
    <input type="text" value={signvalues.name} name="name" onChange={(e)=>{setSignvalues((prev)=>({...prev,name:e.target.value}))}} id="" placeholder="Name" className=" text-black w-[240px] border-none outline-none hover:outline-none ring-1 ring-slate-400 rounded p-2 shadow-sm shadow-slate-400" />
    </div>
      <div className="flex flex-col gap-3">
      <label htmlFor="username">Username</label>
      <input type="text" value={signvalues.username}  onChange={(e)=>{setSignvalues((prev)=>({...prev,username:e.target.value}))}}className="border-none  w-[240px] outline-none hover:outline-none ring-1 ring-slate-400 rounded p-2 shadow-sm text-black  shadow-slate-400" name="username" id="" placeholder="Username" />
      </div>
      <div className="flex flex-col gap-3">
      <label htmlFor="password">Password</label>
      <input type="text" value={signvalues.password}  onChange={(e)=>{setSignvalues((prev)=>({...prev,password:e.target.value}))}} className="border-none  w-[240px] outline-none hover:outline-none ring-1 ring-slate-400 rounded p-2 shadow-sm shadow-slate-400 text-black" name="password" id="" placeholder="Password"  />
      </div>
      <button type="submit" className="bg-slate-900 rounded text-white p-1 w-[200px] " onClick={handleSubmit}> SignUp</button>
      <div><p>Already have an Account?<span className="text-blue-200"><Link to="/login">Login</Link></span></p></div>
    </div>
    </div>

  )
}

export default SignupPage
