import { useEffect, useState } from "react"
import  toast  from "react-hot-toast";


const useGetProducts = () => {
    const [products,setProducts]=useState([]);
  
   
    const getProducts=async()=>{
        try {
            const res=await fetch("http://localhost:5000/api/bills/get/product",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
               
            })
            const data=await res.json();
            console.log(data.products)
            if(data.error){
                toast.error(data.error);
                return;
            }
            setProducts(data.products);
  
        } catch (error) {
            console.log("Error in getproduct hook",error.message);
            toast.error(error.message);
    
        }
    }
    useEffect(()=>{
        getProducts()
      
    },[ ])

    return [products]
}

export default useGetProducts
