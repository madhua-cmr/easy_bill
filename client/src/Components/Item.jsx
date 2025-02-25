import { useEffect } from "react";
import toast  from "react-hot-toast";
import useGetProductName from "../hooks/useGetProductName.js";
import useGetProducts from "../hooks/useGetProducts.js"

const Item = ({ item, setLoading, setItem, items, setItems, setDetails }) => {
  const products=useGetProducts();
  const {productname}=useGetProductName()

   useEffect(() => {
    
    setDetails((prev) => ({
      ...prev,
      items: items, 
    }));
   
  }, [items]);

  const handlevalid=()=>{
    for(const key in item){
      if(item[key]===0){
        toast.error("Enter correct "+key);
        return false;
       
      }
      if(item.code===""){
        toast.error("Select product Code");
        return false;
       
      }
      const reg=/\d/
      if(!reg.test(item[key])&&!key==="pname"){
        toast.error("Enter only number ,Give valid details")
        return false;
      }
    }
    return true;
    
  }
  const handleSubmit = async () => {
    console.log(products)
     if(!handlevalid()){
      return;
     }
    setLoading(true);

   
    
    setItems((prev) => {
      const updatedItems = [...prev, item];
      return updatedItems;
    });

      setLoading(false);
      toast.success("Item added successfully");
      console.log(productname)
      setItem({
        code: "",
        rate:0,
        unit:0,
        bags:0,
      });
   
  };

  return (
    <div className="m-2 flex flex-col gap-4 rounded bg-slate-100 ring-1 ring-slate-200 shadow-2xl p-4">
            <div className="flex gap-2"><label htmlFor="code" >Code :</label>
        <select name="code" value={item.code} className=" rounded p-2  bg-slate-100 shadow-md shadow-slate-400 " onChange={(e)=>{ const selectedProduct=products[0]?.find((p)=>p._id===e.target.value);setItem((prev)=>{return {...prev,code:e.target.value,pname:selectedProduct?.name||""}})}} id="" required>
            <option value="">Select</option>
           {products[0]?.map((product)=>(
            <option key={product._id} value={product._id}>{product.uniquecode}</option>
           ))}
        </select>
        </div>
      <div className="flex gap-4 items-center justify-center">
        <label htmlFor="rate">Rate :</label>
        <input
          type="number"
          name="rate"
          id=""
          value={item.rate}
          onChange={(e) =>
            setItem((prev) => {
              return { ...prev, rate: e.target.value };
            })
          }
          className="w-[150px] no-spinner shadow-lg ring-1 ring-slate-200 outline-none p-1 px-2"
          placeholder="150"
          required
        />
      </div>
      <div className="flex gap-4 items-center justify-center">
        <label htmlFor="unit">Unit :</label>
        <input
          type="number"
          name="unit"
          id=""
          value={item.unit}
          onChange={(e) =>
            setItem((prev) => {
              return { ...prev, unit: e.target.value };
            })
          }
          className="w-[150px] no-spinner shadow-lg ring-1 ring-slate-200 outline-none p-1 px-2"
          placeholder="10"
          required
        />
      </div>
      <div className="flex gap-4 items-center justify-center">
        <label htmlFor="bags">Bags :</label>
        <input
          type="number"
          name="bags"
          id=""
          value={item.bags}
          onChange={(e) =>
            setItem((prev) => {
              return { ...prev, bags: e.target.value };
            })
          }
          className="w-[150px] no-spinner shadow-lg ring-1 ring-slate-200 outline-none p-1 px-2"
          placeholder="5"
          required
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-slate-900 rounded-full w-[130px] text-white p-1 m-4 "
          onClick={() => handleSubmit()}
        >
          Add Item
        </button>
      </div>
    </div>
  );
};

export default Item;
