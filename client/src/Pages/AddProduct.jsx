import { useContext, useState } from "react";
import  toast  from "react-hot-toast";
import { AppContext } from "../Context/AppContextProvider";
import Loader from "../Components/Loader";

const AddProduct = () => {
  const {loading,setLoading}=useContext(AppContext)
  const [details, setDetails] = useState({
    name: "",
    uniquecode: 0,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if(details.uniquecode===0){
        toast.error("Code field required");
        return;
    }
    
    if (details.name.length<3) {
      toast.error("Enter Valid Product Name ,Name length must be greater than 3 ");
      return;
    }
    const regex=/\d/
    if(!regex.test(details.uniquecode)){
        toast.error("Enter digits as code");
        return;
    }
   setLoading(true);

    try {
      const res = await fetch("/api/bills/add/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
         credentials:"include"
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      toast.success(data.message);
      setDetails({
        name: "",
        uniquecode: 0,
      })
    } catch (error) {
      console.log("Error in add customer form submission", error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  };

  if(loading){
    <Loader/>
  }
  return (
    <div>
      <h2 className="text-center text-[20px] font-semibold my-8 ">
        Add Product
      </h2>
      <div className="w-1/2 max-sm:w-full rounded p-6 shadow-md m-auto items-center flex justify-center">
        
        <div className=" flex flex-col gap-4   ">
          <label htmlFor="name">Product Name :</label>
          <input
            type="text"
            name="name"
            placeholder="Apple"
            value={details.name}
            onChange={(e) =>
              setDetails((pre) => {
                return { ...pre, name: e.target.value };
              })
            }
            className="p-2 w-[200px] rounded outline-none hover:outline-none ring-1 ring-slate-200 shadow-xl"
            required
          />

          <label htmlFor="uniquecode"> Code :</label>
          <input
            type="number"
            name="uniquecode"
            placeholder="1"
            value={details.uniquecode}
            onChange={(e) =>
              setDetails((prev) => {
                return { ...prev, uniquecode: e.target.value };
              })
            }
            className="p-2 w-[200px] no-spinner rounded outline-none hover:outline-none ring-1 ring-slate-200 shadow-xl"
            
            required
          />
          <button
            className="bg-slate-900 rounded text-white p-1 w-[70px] my-6"
            type="submit"
            onClick={(e) => submitHandler(e)}
          >
            Submit
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default AddProduct;
