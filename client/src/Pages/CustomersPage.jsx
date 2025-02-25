
import { useNavigate } from "react-router-dom";
import useGetCustomer from "../hooks/useGetCustomer";
import { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContextProvider";
import Loader from "../Components/Loader";
import deleteimage from "../assets/delete.png"
import toast from "react-hot-toast";

const CustomersPage = () => {
  const {loading,setLoading}=useContext(AppContext);
  const[customers, getCustomer]=useGetCustomer();
  const navigate = useNavigate();
  const handledelete=async(id)=>{setLoading(true);
    try {
      const res=await fetch(`http://localhost:5000/api/customer/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          
        },
        credentials:"include"
      });
      
      const data=await res.json();
      if(!data.success){
        toast.error(data.error);
        return;
      }
      getCustomer()
      toast.success(data.message);
    } catch (error) {
      console.log("Error in customer delete frontend",error.message);
      toast.error(error.message)
    }finally{setLoading(false);
    }
  }
 


 if(loading){
  return <Loader/>
 }
  return (
    <div>
      <h2 className="flex items-center justify-center  mt-16 mb-5 text-[18px] font-semibold ">
        Customers
      </h2>
      {customers.length === 0 ? (
        <p className="w-full h-full flex items-center justify-center mt-32">No customers</p>
      ) : (
        <div className="flex flex-col gap-8 m-auto sm:w-1/2 ">
          {customers.map((customer) => (
          
              <div
                key={customer._id}
                className="flex flex-col gap-1 p-10 shadow-xl shadow-slate-300 ring-1 ring-slate-200 rounded m-10 hover:shadow-2xl"
              >
                <div className="flex  justify-between">
                  <div>
                <div className="flex gap-2">
                  <h3>Name :</h3>
                  <p>{customer.name}</p>
                </div>
                <div className="flex gap-2">
                  <h3>Contact :</h3>
                  <p>{customer.contact}</p>
                </div>
                <div className="flex gap-2">
                  <h3>Balance Amount :</h3>
                  <p>{customer.balanceAmount}</p>
                </div>
                </div>
        
                <img src={deleteimage} onClick={()=>handledelete(customer._id)} className="h-8 w-8 cursor-pointer "alt="" />
             
                </div>
                <button
                  className="w-[100px] h-[35px] bg-slate-900 rounded text-white"
                  onClick={() => navigate(`/${customer._id}/bills`)}
                >
                  View bills
                </button>
              </div>
           
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomersPage;
