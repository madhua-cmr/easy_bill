import { useContext, useEffect, useState } from "react";
import  toast  from "react-hot-toast";
import { AppContext } from "../Context/AppContextProvider";

const useGetCustomer =() => {
    const {loading,setLoading}=useContext(AppContext);
const [customers, setCustomers] = useState([]);
const getCustomer=async ()=>{
  setLoading(true);
    try {
        const res = await fetch("/api/customer/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
       
        if (data.error) {
          toast.error(data.error);
          return;
        }
        setCustomers(data.customers);
     
      } catch (error) {
        console.log("Error in get customers page", error.message);
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
}
useEffect(()=>{
       getCustomer() },
       [])
  return [customers,getCustomer]
}

export default useGetCustomer
