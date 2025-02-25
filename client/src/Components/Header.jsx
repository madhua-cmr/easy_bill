import {   NavLink, useNavigate } from "react-router-dom"
import { IoMenu } from "react-icons/io5";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { TbLogout } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSolidLogInCircle } from "react-icons/bi";
import { AppContext } from "../Context/AppContextProvider";
import { TiUserAdd } from "react-icons/ti";
const Header = () => {
    const navigate=useNavigate();
    const{setUser,setIsAdmin,isadmin,user,loading,setLoading}=useContext(AppContext);
    const [menuIcon,setMenuIcon]=useState(false);
    const handleLogout=async()=>{
      setLoading(true);
      try {
        const res=await fetch("http://localhost:5000/api/user/logout",{
          method:"GET",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include"
        })
        const data=await res.json();
        if(!data.success){
         toast.error(data.error);
         return;
        }
        setUser(null);
        localStorage.removeItem("user");
        setIsAdmin(false);
        navigate("/login");
      } catch (error) {
        console.log("Error in logout frontend",error.message);
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
    }
  return (
    <div className="bg-slate-900 text-white text-[18px] p-8 flex max-sm:flex-col gap-8 sm:items-center justify-center sm:justify-between ">
      <div className="flex items-center justify-between"><h1 className="text-[22px] cursor-pointer font-semibold" onClick={()=>navigate("/")}>EASYBILL</h1>
      <IoMenu onClick={()=>{ console.log(menuIcon); setMenuIcon((prev)=>{return !prev})}} className="text-[22px] cursor-pointer hidden max-sm:block"/></div>

  <div className={` ${menuIcon===true?"hidden":"block"} flex gap-6 flex-row max-sm:flex-col `}> {user&&<NavLink to="/customers"><h2>Customers</h2></NavLink>}
  {user&&isadmin&& <NavLink to="/add"><h2>Add Bill</h2></NavLink>}
  {user&&isadmin&& <NavLink to="/add-customer"><h2>Add Customer</h2></NavLink>}
  {user&&isadmin&& <NavLink to="/add-product"><h2>Add Product</h2></NavLink>}
    {user&&(
      <div>
        <h3>Hi &#128075;{user.name}</h3>
      </div>
    )}
    <div className="cursor-pointer relative group "><FaRegUserCircle className="text-[22px] "/>
  {user&&<div className="bg-white absolute max-sm:left-0  w-[90px] top-5 z-30 right-1 hidden group-hover:block  border-0 rounded flex-col h-[45px] shadow-sm shadow-slate-400 text-black  items-center  p-2">
    <div className="cursor-pointer flex items-center gap-2  " onClick={handleLogout}><p>Logout</p><TbLogout  className="text-[18px]"/></div>
    </div>}
 {!user&&
    <div className="bg-white absolute top-5 max-sm:left-0  w-[90px]  right-1 z-30 hidden group-hover:block rounded flex-col shadow-sm shadow-slate-400 text-black  items-center   ">
    <div className="cursor-pointer flex items-center gap-4 p-1 border-b-2 " onClick={()=>navigate("/login")}><p className="text-[17px]">Login</p><BiSolidLogInCircle className="text-[18px]"/></div>
    <div className="cursor-pointer flex items-center gap-4 p-1  " onClick={()=>navigate("/signup")}><p className="text-[16px]">SignUp</p><TiUserAdd   className="text-[18px]"/></div>
    </div>
    
}
</div>
 
   
    </div>
    </div>
  )
}

export default Header
