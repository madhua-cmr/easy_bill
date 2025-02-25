import { MdOutlineAddBox } from "react-icons/md";
import Item from "../Components/Item";
import { useContext, useEffect, useState } from "react";
import useGetCustomer from "../hooks/useGetCustomer";
import  toast  from "react-hot-toast";

import useGetProductName from "../hooks/useGetProductName";
import Loader from "../Components/Loader";
import { AppContext } from "../Context/AppContextProvider";
const AddBillPage = () => {
const {productname}=useGetProductName();

 const {loading,setLoading}=useContext(AppContext);
 const[customers]=useGetCustomer();


    const [items,setItems]=useState([]);
    const [item,setItem]=useState({
        code:"",
        rate:0,
        unit:0,
        bags:0,
        pname:""
    })
    const [details,setDetails]=useState({
      customerId:"",
      items:[],
      paid:0
    })
    useEffect(()=>{ console.log(productname)},[productname])
  
    const validform=()=>{
      if(details.items.length===0){
        toast.error("You should add atleast one item to create bill");
        return false;
      }
if(details.customerId==""){
  toast.error("Please select customer");
  return false;
}
const reg=/\d/
if(!reg.test(details.paid)){
  toast.error("Please give valid Paid amount");
  return false
}
return true

    }
    const handleAddBill=async()=>{
      setLoading(true);
  if(!validform()){
return;
  }
      try {

        const res=await fetch("/api/bills/",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
      
          },
          body:JSON.stringify(details),
          credentials:"include"
        })
        const data=await res.json();
        if(data.error){
          toast.error(data.error);
        }
        if(data.success){
toast.success(data.message);
setItems([]);
setItem({
  code:"",
  rate:0,
  unit:0,
  bags:0,
  pame:""
});
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
    <div className="p-8">
     <h2 className="text-center text-[20px] font-semibold"> Add Bill</h2>
     <div  className="flex flex-col gap-4  items-center mt-5 justify-center">
       <div className="flex gap-2"><label htmlFor="customername" >Cutomer Name :</label>
        <select name="customername" value={details.customerId} className=" rounded p-2  bg-slate-100 shadow-md shadow-slate-400 " onChange={(e)=>setDetails((prev)=>{return {...prev,customerId:e.target.value}})} id="" required>
            <option value="">Select</option>
           {customers.map((customer)=>(
            <option key={customer._id} value={customer._id}>{customer.name}</option>
           ))}
        </select>
        </div>
   
        <div className="flex gap-2 items-center "> <h2>Add Item</h2>
        <MdOutlineAddBox className="cursor-pointer text-[22px]" />
        </div>
   <Item item={item} setLoading={setLoading} items={items} setItem={setItem} setItems={setItems} setDetails={setDetails}/>
   <div  className="flex flex-col gap-4  items-center mt-5 justify-center">
        <div className="flex gap-2"><label htmlFor="paid" >Paid Amount :</label>
        <input type="number" name="paid" id="" value={details.paid}  onChange={(e)=>setDetails((prev)=>{return {...prev,paid:e.target.value}})}className="w-[50px] no-spinner shadow-md  ring-1 ring-slate-300 rounded p-1 px-2 outline-none" required/>
     </div>
    <button className="bg-blue-950 text-white w-[150px] rounded h-[30px] hover:bg-blue-800" onClick={()=>handleAddBill()} disabled={loading}>{loading?(<div className="animate-spin w-5 h-5 border-t-2 border-white rounded-full"></div>):(<p>Add Bill</p>) }</button>
     </div>

     
        <div className="grid-cols-[repeat(4,1fr)] grid my-4 justify-items-center border-2 border-slate-200  w-3/4 p-1">
            <h3>Code</h3>
        <h3>Rate</h3>
        <h3>Unit</h3>
        <h3>Bags</h3>
        </div>
        {items.length===0?<p className="text-center">No items added yet</p>:(items?.map((item,index)=>(
            <div key={index} className="grid-cols-[repeat(4,1fr)]  justify-items-center grid  my-4 w-3/4 p-1 border-2 border-slate-200 ">
        <h3>{item.pname}</h3>
        <h3>{item.rate}</h3>
        <h3>{item.unit}</h3>
        <h3>{item.bags}</h3>
        </div>)
        ))}
    </div>
    </div>
  )
}

export default AddBillPage
