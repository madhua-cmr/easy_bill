import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../Context/AppContextProvider";

const useFilterBills = () => {
        const [bills,setBills]=useState([]);
          const{loading,setLoading}=useContext(AppContext);
        const [report,setReport]=useState({});
        const [filtervalues,SetFilterValues]=useState({
            startDate:"",
            endDate:""
          });
         
        const {custid}=useParams();
            const customerbills=async()=>{
  setLoading(true);
              try {
                const res=await fetch(`/api/customer/${custid}`,{
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json",
    
                  },
                  credentials:"include",
                  body:JSON.stringify(filtervalues)
                  
                })
                const data=await res.json();
               
                if(!data.success){
                  toast.error(data.error);
                  return;
                }
                setBills(data.bills);
                setReport(data.report);
                localStorage.setItem("report",JSON.stringify(data.report));
               
              } catch (error) {
                console.log("Error in get customerbills frontend",error.message);
                toast.error(error.message);
              }finally{
                setLoading(false);
              }
            }
        
  return {customerbills,report,bills,filtervalues,SetFilterValues}
}

export default useFilterBills
