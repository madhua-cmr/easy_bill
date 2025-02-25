import {  useState } from "react"
import  toast  from "react-hot-toast";

const useGetProductName = () => {
  const[productname,setProductName]=useState("")
const fetchproductname=async({id})=>{

 
   try {
   
    const res=await fetch(`http://localhost:5000/api/bills/product/${id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json" }
    })
    const data=await res.json();
    if(!data.success){
 toast.error(data.error);
 return;
    }
    
    setProductName( data.productName);
   } catch (error) {
    console.log("Error in getProductName frontend hook",error.message);
    toast.error(error.message)
   }

}

  return {fetchproductname,productname};
}

export default useGetProductName
