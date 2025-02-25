import { useNavigate } from "react-router-dom";
import background from "../assets/background.jpg"
import { useContext } from "react";
import { AppContext } from "../Context/AppContextProvider";

const HomePage = () => {
  const {user}=useContext(AppContext);
  const navigate=useNavigate();
  return <div className="w-full relative h-[633px] flex justify-center " > 
   <div className=" absolute p-8 sm:w-1/2 z-30 flex items-center flex-col w-full justify-center gap-6 h-full  "> <h2>Welcome to EasyBill – The Smarter Way to Bill!</h2> <h3>Simplify Your Billing, Boost Your Business!</h3> <p>Tired of slow and complicated billing? EasyBill is here to make your life easier! Our smart, fast, and efficient billing system helps you generate invoices, track payments, and manage sales – all in just a few clicks.</p>{!user&&<button className="bg-slate-900 items-center flex justify-center text-white p-1 rounded-full w-[80px]" onClick={()=>navigate("/login")}>Login</button>}{!user&& <button  onClick={()=>navigate("/signup")} className="bg-slate-900 items-center flex justify-center rounded-full text-white p-1  w-[80px]">SignUp</button>}</div>
  <img src={background} alt="" className="object-cover z-1 w-full h-full"/>
 
  </div>
};

export default HomePage;
