
import bg from "../assets/login.jpg"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContextProvider";
import Loader from "./Loader";
import toast from "react-hot-toast";

const LoginPage = () => {
    const{loading,setLoading,setUser, setIsAdmin}=useContext(AppContext)
    const navigate=useNavigate();
    const [loginvalues,setLoginvalues]=useState({
   username:"",
   password:"",
    })
  
    const handleLogin=async()=>{
        setLoading(true);
  try {
    const res=await fetch("http://localhost:5000/api/user/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",

      },
      body:JSON.stringify(loginvalues),
      credentials:"include"
    })
    const data=await res.json();
    if(!data.success){
      toast.error(data.error);
      return;
    }
    if(data.success){
      setUser(data.user);
       localStorage.setItem("user",JSON.stringify(data.user));
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
        <Loader/>
    }
  return (
   <div className="h-[633px] text-white w-full flex flex-col items-center justify-center  " >
       <img src={bg} className=" z-10 w-full h-full object-cover " alt="" />
     <div className=" absolute z-30 py-16 px-8 border-2  flex items-center flex-col gap-6 justify-center m-auto  border-slate-200 ring-1  ring-slate-200 rounded  w-1/2 max-sm:w-3/4 lg:w-1/4">
      <div>Login</div>
     
      <div className="flex flex-col gap-3">
      <label htmlFor="username">Username</label>
      <input type="text" value={loginvalues.username} onChange={(e)=>{setLoginvalues((prev)=>({...prev,username:e.target.value}))}} className="border-none  text-black w-[240px] outline-none hover:outline-none ring-1 ring-slate-400 rounded p-2 shadow-sm shadow-slate-400" name="username" id="" placeholder="Username" />
      </div>
      <div className="flex flex-col gap-3">
      <label htmlFor="password">Password</label>
      <input type="text" value={loginvalues.password}  onChange={(e)=>{setLoginvalues((prev)=>({...prev,password:e.target.value}))}} className="border-none  text-black w-[240px] outline-none hover:outline-none ring-1 ring-slate-400 rounded p-2 shadow-sm shadow-slate-400" name="password" id="" placeholder="Password"  />
      </div>
      <button type="submit" className="bg-slate-900  rounded text-white p-1 w-[200px] " onClick={handleLogin}> Login </button>
      <div><p>Don&apos;t have an Account ? <span className="text-blue-200"><Link to="/signup"> SignUp </Link></span></p></div>
    </div>
   
    </div>
  )
}

export default LoginPage
